import {options} from '@/app/api/auth/[...nextauth]/options';
import CategoryIndex from '@/components/inventory/category';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import {getCategories} from '@/services/page/inventory/categories/store-categories';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';

const CategoryPage = async (props: {params: Promise<{team: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const {team} = params;

    const token = session?.accessToken || '';

    const {store} = await getStoreFromTeam({id: team, token});

    const storeId = store.id;

    const [categories] = await Promise.all([getCategories({storeId, token})]);

    return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={team}>
				<CategoryIndex data={{categories, storeId, isTeam: true}} />
			</TeamInventoryLayout>
		</div>
	);
};

export default CategoryPage;
