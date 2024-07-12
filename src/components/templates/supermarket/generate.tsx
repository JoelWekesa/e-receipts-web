'use client';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import AddReceiptItems from '@/components/shared/additems';
import ClientDetailsComponent from '@/components/shared/client-details';
import ControlUnitComponent from '@/components/shared/controlunit';
import LoyaltyPointsComponent from '@/components/shared/loyaltypoints';
import AddPaymentDetails from '@/components/shared/payment';
import {useAtom} from 'jotai';
import {FC} from 'react';
import ToggleInventory from '../toggle';
import inventoryTypeAtom from '@/atoms/receiptgen/inventory-type';
import AddReceiptItemsInventory from '@/components/shared/additems-inventory';
import {Product} from '@/models/inventory/product';
interface Props {
	storeId: string;
	token: string;
	products: Product[];
}

const GenerateSuperMarketTemplate: FC<Props> = ({storeId, token, products}) => {
	const [path] = useAtom(navigateAtom);
	const [inventoryType] = useAtom(inventoryTypeAtom);

	return (
		<div className='flex flex-col gap-3'>
			{path === Path.CLIENT_DETAILS && <ClientDetailsComponent />}
			{path === Path.RECEIPT_ITEM && (
				<div className='flex flex-col gap-2'>
					<ToggleInventory />
					{inventoryType ? <AddReceiptItemsInventory products={products} /> : <AddReceiptItems />}
				</div>
			)}
			{path === Path.PAYMENT && <AddPaymentDetails />}
			{path === Path.CONTROL_UNIT && <ControlUnitComponent />}
			{path === Path.LOYALTY_POINTS && <LoyaltyPointsComponent storeId={storeId} token={token} />}
		</div>
	);
};

export default GenerateSuperMarketTemplate;
