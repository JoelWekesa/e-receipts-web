import {MainNav} from '@/components/dashboard/MainNav';
import {Search} from '@/components/dashboard/Search';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import UserStores from '@/components/stores/user';
import {Store} from '@/models/store';
import {auth} from '@clerk/nextjs';
import axios from 'axios';

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
	const {sessionId: token} = auth();

	const page = '' + searchParams?.page;

	const data = await getData({
		page,
		token: token ? token : '',
	});

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher />
						<MainNav className='mx-6' />
						<div className='ml-auto flex items-center space-x-4'>
							<Search />
						</div>
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<UserStores page={page} initialData={data} />
			</div>
		</>
	);
};

export default StoresPage;
