import {options} from '@/app/api/auth/[...nextauth]/options';
import AddProduct from '@/components/inventory/add';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import {getCategories} from '@/services/page/inventory/categories/store-categories';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';

const AddInventoryPage = async ({params}: {params: {team: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {team} = params;

	const {store} = await getStoreFromTeam({id: team, token});

	const storeId = store.id;

	const [categories] = await Promise.all([getCategories({storeId, token})]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={team}>
				<AddProduct categories={categories} storeId={storeId} token={token} />
			</TeamInventoryLayout>
		</div>
	);
};

export default AddInventoryPage;
