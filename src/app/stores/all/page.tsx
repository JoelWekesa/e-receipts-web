import {options} from '@/app/api/auth/[...nextauth]/options';
import {MainNav} from '@/components/dashboard/MainNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import UserStores from '@/components/stores/user';
import ApiClient from '@/config/axios';
import InventoryClient from '@/config/axios-inventory';
import {Store} from '@/models/store';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
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

	const token = session?.accessToken || '';

	const [data, total, teams, stores, permissions] = await Promise.all([
		getData({token}),
		getTotals({token}),
		getTeams({token}),
		userStores(token),
		getPermissions({token}),
	]);

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
						<MainNav className='mx-6' />
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
