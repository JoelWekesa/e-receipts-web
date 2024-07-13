import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import InventoryLayout from '@/components/inventory/inventory-layout';
import StoreInventory from '@/components/inventory/store/inventory';
import InventoryClient from '@/config/axios-inventory';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getServerSession} from 'next-auth';

const getInventory = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const getTotal = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store/value?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const InventoryPage = async ({params}: {params: {store: string}}) => {
	const storeId = params.store;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [inventory, total, teams, stores, permissions] = await Promise.all([
		getInventory({storeId, token}),
		getTotal({storeId, token}),
		getTeams({token}),
		userStores(token),
		getPermissions({token}),
	]);

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher teams={teams} permissions={permissions} stores={stores} />
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-1'>
				<InventoryLayout storeId={storeId}>
					<StoreInventory item={{storeId, inventory, total}} />
				</InventoryLayout>
			</div>
		</>
	);
};

export default InventoryPage;
