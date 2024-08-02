import {options} from '@/app/api/auth/[...nextauth]/options';
import EditProduct from '@/components/inventory/edit';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import {getCategories} from '@/services/page/inventory/categories/store-categories';
import {getInventory} from '@/services/page/inventory/get';
import {getInventoryOptions} from '@/services/page/inventory/variants/options';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';

const InventoryPage = async ({params}: {params: {team: string[]}}) => {
	const {team} = params;

	const teamId = team[0];

	const inventoryId = team[1];

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {store} = await getStoreFromTeam({id: teamId, token});

	const inventory = await getInventory({id: inventoryId, token});

	const [categories, opts] = await Promise.all([
		getCategories({storeId: store.id, token}),
		getInventoryOptions({id: inventoryId, token}),
	]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={teamId}>
				<EditProduct categories={categories} inventory={inventory} opts={opts} token={token} />
			</TeamInventoryLayout>
		</div>
	);
};

export default InventoryPage;
