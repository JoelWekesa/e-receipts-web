import {options} from '@/app/api/auth/[...nextauth]/options';
import EditVariantComponent from '@/components/inventory/edit-variant';
import InventoryLayout from '@/components/inventory/inventory-layout';
import {getInventory} from '@/services/page/inventory/get';
import {getVariant} from '@/services/page/inventory/variants/get';
import {getInventoryOptions} from '@/services/page/inventory/variants/options';
import {getServerSession} from 'next-auth';

const EditVariantPage = async (props: {params: Promise<{variant: string}>}) => {
    const params = await props.params;
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
