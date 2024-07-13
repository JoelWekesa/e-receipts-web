import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {options} from '@/app/api/auth/[...nextauth]/options';
import InventoryLayout from '@/components/inventory/inventory-layout';
import {getServerSession} from 'next-auth';
import {Inventory, Variant} from '@/models/inventory/inventory';
import InventoryClient from '@/config/axios-inventory';
import EditVariantComponent from '@/components/inventory/edit-variant';
import {Option} from '@/models/inventory/option';
import ApiClient from '@/config/axios';
import {MemberTeam} from '@/models/teams/member-team';
import {userStores} from '@/services/page/stores/user-stores';
import {getPermissions} from '@/services/page/teams/permissions';

const getVariant = async ({id, token}: {id: string; token: string}) => {
	const variant: Variant = await InventoryClient({
		token,
	})
		.get(`inventory/variant?id=${id}`)
		.then((res) => res.data);

	return variant;
};

const getInventoryOptions = async ({id, token}: {id: string; token: string}) => {
	const response: Option[] = await InventoryClient({
		token,
	})
		.get(`/inventory/options?inventoryId=${id}`)
		.then((res) => res.data);
	return response;
};

const getTeams = async ({token}: {token: string}) => {
	const response: MemberTeam[] = await ApiClient(token)
		.get('teams/my-teams')
		.then((res) => res.data);
	return response;
};

const getInventory = async ({id, token}: {id: string; token: string}) => {
	const response: Inventory = await InventoryClient({
		token,
	})
		.get(`/inventory?id=${id}`)
		.then((res) => res.data);

	return response;
};

const EditVariantPage = async ({params}: {params: {variant: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const id = params.variant;

	const variant = await getVariant({id, token});

	const [opts, inventory, teams, stores, permissions] = await Promise.all([
		getInventoryOptions({id: variant.inventoryId, token}),
		getInventory({id: variant.inventoryId, token}),
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
				<InventoryLayout storeId={variant.storeId || ''}>
					<EditVariantComponent variant={variant} options={opts} inventory={inventory} />
				</InventoryLayout>
			</div>
		</>
	);
};

export default EditVariantPage;
