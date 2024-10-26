import {options} from '@/app/api/auth/[...nextauth]/options';
import InventoryLayout from '@/components/inventory/inventory-layout';
import StoreInventory from '@/components/inventory/store/inventory';
import InventoryClient from '@/config/axios-inventory';
import {getServerSession} from 'next-auth';

const getInventory = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const getTotal = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store/value?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const InventoryPage = async (props: {params: Promise<{store: string}>}) => {
    const params = await props.params;
    const storeId = params.store;

    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const [inventory, total] = await Promise.all([getInventory({storeId, token}), getTotal({storeId, token})]);

    return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<InventoryLayout storeId={storeId}>
				<StoreInventory item={{storeId, inventory, total}} />
			</InventoryLayout>
		</div>
	);
};

export default InventoryPage;
