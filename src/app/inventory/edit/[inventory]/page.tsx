import {options} from '@/app/api/auth/[...nextauth]/options';
import EditProduct from '@/components/inventory/edit';
import InventoryLayout from '@/components/inventory/inventory-layout';
import InventoryClient from '@/config/axios-inventory';
import {Category} from '@/models/inventory/category';
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

const getCategories = async ({storeId, token}: {storeId: string; token: string}) => {
	const response: Category[] = await InventoryClient({
		token,
	})
		.get(`category/all?storeId=${storeId}`)
		.then((res) => res.data);

	return response;
};

const InventoryPage = async ({params}: {params: {inventory: string}}) => {
	const id = params.inventory;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const inventory = await getInventory({id, token});

	const [categories, opts] = await Promise.all([
		getCategories({storeId: inventory.storeId, token}),
		getInventoryOptions({id, token}),
	]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<InventoryLayout storeId={inventory.storeId}>
				<EditProduct categories={categories} inventory={inventory} opts={opts} token={token} />
			</InventoryLayout>
		</div>
	);
};

export default InventoryPage;
