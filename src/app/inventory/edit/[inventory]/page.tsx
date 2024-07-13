import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import EditProduct from '@/components/inventory/edit';
import InventoryLayout from '@/components/inventory/inventory-layout';
import InventoryClient from '@/config/axios-inventory';
import {Category} from '@/models/inventory/category';
import {Inventory} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import {getServerSession} from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options';
import {MemberTeam} from '@/models/teams/member-team';
import ApiClient from '@/config/axios';
import {userStores} from '@/services/page/stores/user-stores';
import {getPermissions} from '@/services/page/teams/permissions';

const getInventory = async ({id, token}: {id: string; token: string}) => {
	const response: Inventory = await InventoryClient({
		token,
	})
		.get(`/inventory?id=${id}`)
		.then((res) => res.data);

	return response;
};

const getInventoryOptions = async ({id, token}: {id: string; token: string}) => {
	const response: Option[] = await InventoryClient({
		token,
	})
		.get(`/inventory/options?inventoryId=${id}`)
		.then((res) => res.data);
	return response;
};

const getCategories = async ({storeId, token}: {storeId: string; token: string}) => {
	const response: Category[] = await InventoryClient({
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

const InventoryPage = async ({params}: {params: {inventory: string}}) => {
	const id = params.inventory;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const inventory = await getInventory({id, token});

	const [categories, opts, teams, stores, permissions] = await Promise.all([
		getCategories({storeId: inventory.storeId, token}),
		getInventoryOptions({id, token}),
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
				<InventoryLayout storeId={inventory.storeId}>
					<EditProduct categories={categories} inventory={inventory} opts={opts} />
				</InventoryLayout>
			</div>
		</>
	);
};

export default InventoryPage;
