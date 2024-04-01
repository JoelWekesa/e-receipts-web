import UserStores from '@/components/stores/user';
import {Store} from '@/models/store';
import axios from 'axios';
import {cookies} from 'next/headers';

export const revalidate = 1;

interface GetData {
	page: string;
	token: string;
}

async function getData({page, token}: GetData): Promise<Store> {
	const res = await axios
		.get(
			process.env.NEXT_PUBLIC_API_URL + 'stores/stores?page=' + page + '&pageSize=' + process.env.NEXT_PUBLIC_PER_PAGE,
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
		.then((res) => res.data)
		.catch((err) => {
			// console.log(err?.response?.data);
			throw new Error(err);
		});

	return res;
}

const StoresPage = async ({searchParams}: {searchParams: {[key: string]: string | string[] | undefined}}) => {
	const cookieStore = cookies();

	const token = cookieStore.get('clerk_session');

	const page = '' + searchParams?.page;

	const data = await getData({
		page,
		token: token ? token.value : '',
	});

	return (
		<div className='p-3'>
			<UserStores page={page} initialData={data} />
		</div>
	);
};

export default StoresPage;
