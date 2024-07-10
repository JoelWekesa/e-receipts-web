import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import InventoryLayout from '@/components/inventory/inventory-layout';
import ViewProductVariantsComponent from '@/components/inventory/see/variants';
import InventoryClient from '@/config/axios-inventory';
import {Inventory} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import {getServerSession} from 'next-auth';

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

const InventoryVariantsPage = async ({params}: {params: {inventory: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const id = params.inventory;

	const [inventory, opts] = await Promise.all([getInventory({id, token}), getInventoryOptions({id, token})]);

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher />
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-1'>
				<InventoryLayout storeId={inventory.storeId}>
					<ViewProductVariantsComponent inventory={inventory} options={opts} />
				</InventoryLayout>
			</div>
		</>
	);
};

export default InventoryVariantsPage;
