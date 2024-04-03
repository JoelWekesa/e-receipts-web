import UpdateStoreComponent from '@/components/stores/update';
import axios from '@/config/axios';
import {Store} from '@/models/store';
import {auth} from '@clerk/nextjs';

interface GetData {
	id: string;
	token: string;
}

async function getData({id, token}: GetData): Promise<Store> {
	const res = await axios
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/store?id=' + id, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data)
		.catch((err) => {
			// console.log(err?.response?.data);initialData});
			throw new Error(err);
		});

	return res;
}

const StoresPage = async ({searchParams}: {searchParams: {[key: string]: string | string[] | undefined}}) => {
	const {sessionId: token} = auth();

	const id = '' + searchParams?.id;

	const data = await getData({
		token: token ? token : '',
		id,
	});

	return (
		<div className='p-3'>
			<UpdateStoreComponent id={id} initialData={data} />
		</div>
	);
};

export default StoresPage;
