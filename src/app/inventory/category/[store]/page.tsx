import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import CategoryIndex from '@/components/inventory/category';
import InventoryLayout from '@/components/inventory/inventory-layout';
import ApiClient from '@/config/axios';
import InventoryClient from '@/config/axios-inventory';
import {MemberTeam} from '@/models/teams/member-team';
import {userStores} from '@/services/page/stores/user-stores';
import {getPermissions} from '@/services/page/teams/permissions';
import {getServerSession} from 'next-auth';

const getCategories = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({
		token,
	})
		.get(`category/all?storeId=${storeId}`)
		.then((res) => res.data);

	return response;
};

const getTeams = async ({token}: {token: string}) => {
	const response: MemberTeam[] = await ApiClient(token)
		.get('teams/my-teams')
		.then((res) => res.data);
	return response;
};

const CategoryPage = async ({params}: {params: {store: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const storeId = params.store;

	const [categories, teams, stores, permissions] = await Promise.all([
		getCategories({storeId, token}),
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
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-1'>
				<InventoryLayout storeId={storeId}>
					<CategoryIndex data={{categories, storeId}} />
				</InventoryLayout>
			</div>
		</>
	);
};

export default CategoryPage;
