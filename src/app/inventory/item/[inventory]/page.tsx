import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import InventoryLayout from '@/components/inventory/inventory-layout';
import ViewProductComponent from '@/components/inventory/see';
import InventoryClient from '@/config/axios-inventory';
import {Inventory} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import {getServerSession} from 'next-auth';
import {Total} from '@/models/inventory/total';
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

const getInventoryTotal = async ({id, token}: {id: string; token: string}) => {
	const response: Total = await InventoryClient({
		token,
	})
		.get(`inventory/value?id=${id}`)
		.then((res) => res.data);
	return response;
};

const getTeams = async ({token}: {token: string}) => {
	const response: MemberTeam[] = await ApiClient(token)
		.get('teams/my-teams')
		.then((res) => res.data);
	return response;
};

const InventoryItemPage = async ({params}: {params: {inventory: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const id = params.inventory;

	const [inventory, data, total, teams, stores, permissions] = await Promise.all([
		getInventory({id, token}),
		getInventoryOptions({id, token}),
		getInventoryTotal({id, token}),
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
				<InventoryLayout storeId={inventory.storeId}>
					<ViewProductComponent inventory={inventory} data={data} total={total} />
				</InventoryLayout>
			</div>
		</>
	);
};

export default InventoryItemPage;
