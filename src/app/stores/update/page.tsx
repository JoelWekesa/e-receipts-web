import {options} from '@/app/api/auth/[...nextauth]/options';
import UpdateStoreComponent from '@/components/stores/update';
import ApiClient from '@/config/axios';
import {Store} from '@/models/store';
import {getServerSession} from 'next-auth';

interface GetData {
	id: string;
	token: string;
}

async function getData({id, token}: GetData): Promise<Store> {
	const res = await ApiClient(token)
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/store?id=' + id)
		.then((res) => res.data)
		.catch((err) => {
			// console.log(err?.response?.data);initialData});
			throw new Error(err);
		});

	return res;
}

const StoresPage = async ({searchParams}: {searchParams: {[key: string]: string | string[] | undefined}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken;

	const id = '' + searchParams?.id;

	const data = await getData({
		token: token ? token : '',
		id,
	});

	return (
		<div className='p-3'>
			<UpdateStoreComponent id={id} initialData={data} token={token ? token : ''} />
		</div>
	);
};

export default StoresPage;
