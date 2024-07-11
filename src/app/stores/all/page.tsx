import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import UserStores from '@/components/stores/user';
import ApiClient from '@/config/axios';
import InventoryClient from '@/config/axios-inventory';
import {Store} from '@/models/store';
import {getServerSession} from 'next-auth';

async function getData({token}: {token: string}): Promise<Store[]> {
	const res = await ApiClient(token)
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/stores')
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err);
		});

	return res;
}

const getTotals = async ({token}: {token: string}) => {
	const res = await InventoryClient({
		token,
	})
		.get('inventory/all/value')
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err);
		});

	return res;
};

const StoresPage = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken;

	const [data, total] = await Promise.all([
		getData({token: token ? token : ''}),
		getTotals({token: token ? token : ''}),
	]);

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher />
						{/* <MainNav className='mx-6' /> */}
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<UserStores initialData={data} token={token ? token : ''} total={total} />
			</div>
		</>
	);
};

export default StoresPage;
