import { options } from '@/app/api/auth/[...nextauth]/options';
import AddInventoryTabs from '@/components/inventory/add';
import InventoryLayout from '@/components/inventory/inventory-layout';
import InventoryClient from '@/config/axios-inventory';
import { getServerSession } from 'next-auth';

const getCategories = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({
		token,
	})
		.get(`category/all?storeId=${storeId}`)
		.then((res) => res.data);

	return response;
};

const AddInventoryPage = async (props: {params: Promise<{store: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const storeId = params.store;

    const [categories] = await Promise.all([getCategories({storeId, token})]);

    return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<InventoryLayout storeId={storeId}>
				<AddInventoryTabs categories={categories} storeId={storeId} token={token} />
			</InventoryLayout>
		</div>
	);
};

export default AddInventoryPage;
