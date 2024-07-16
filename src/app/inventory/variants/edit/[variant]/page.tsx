import {options} from '@/app/api/auth/[...nextauth]/options';
import EditVariantComponent from '@/components/inventory/edit-variant';
import InventoryLayout from '@/components/inventory/inventory-layout';
import InventoryClient from '@/config/axios-inventory';
import {Inventory, Variant} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import {getServerSession} from 'next-auth';

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

	const [opts, inventory] = await Promise.all([
		getInventoryOptions({id: variant.inventoryId, token}),
		getInventory({id: variant.inventoryId, token}),
	]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<InventoryLayout storeId={variant.storeId || ''}>
				<EditVariantComponent variant={variant} options={opts} inventory={inventory} />
			</InventoryLayout>
		</div>
	);
};

export default EditVariantPage;
