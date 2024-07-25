import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreInventory from '@/components/inventory/store/inventory';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import InventoryClient from '@/config/axios-inventory';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
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

const InventoryPage = async ({params}: {params: {team: string}}) => {
	const session = await getServerSession(options);

	const {team} = params;

	const token = session?.accessToken || '';

	const {store} = await getStoreFromTeam({id: team, token});

	const storeId = store.id;

	const [inventory, total] = await Promise.all([getInventory({storeId, token}), getTotal({storeId, token})]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={team}>
				<StoreInventory item={{storeId, inventory, total, isTeam: true, teamId: team}} />
			</TeamInventoryLayout>
		</div>
	);
};

export default InventoryPage;
