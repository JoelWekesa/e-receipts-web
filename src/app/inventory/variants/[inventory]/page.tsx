import {options} from '@/app/api/auth/[...nextauth]/options';
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

const InventoryVariantsPage = async (props: {params: Promise<{inventory: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const id = params.inventory;

    const [inventory, opts] = await Promise.all([getInventory({id, token}), getInventoryOptions({id, token})]);

    return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<InventoryLayout storeId={inventory.storeId}>
				<ViewProductVariantsComponent inventory={inventory} options={opts} />
			</InventoryLayout>
		</div>
	);
};

export default InventoryVariantsPage;
