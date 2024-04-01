import UpdateStoreComponent from '@/components/stores/update';
import axios from '@/config/axios';
import {StoreDatum} from '@/models/store';
import {cookies} from 'next/headers';

interface GetData {
	id: string;
	token: string;
}

async function getData({id, token}: GetData): Promise<StoreDatum> {
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
	const id = '' + searchParams?.id;

	const cookieStore = cookies();

	const token = cookieStore.get('clerk_session');

	const data = await getData({
		token: token ? token.value : '',
		id,
	});

	return (
		<div className='p-3'>
			<UpdateStoreComponent id={id} initialData={data} />
		</div>
	);
};

export default StoresPage;
