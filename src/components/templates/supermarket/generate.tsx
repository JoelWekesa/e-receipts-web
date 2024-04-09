'use client';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import AddReceiptItems from '@/components/shared/additems';
import ClientDetailsComponent from '@/components/shared/client-details';
import ControlUnitComponent from '@/components/shared/controlunit';
import LoyaltyPointsComponent from '@/components/shared/loyaltypoints';
import AddPaymentDetails from '@/components/shared/payments';
import {useAtom} from 'jotai';

const GenerateSuperMarketTemplate = () => {
	const [path] = useAtom(navigateAtom);

	return (
		<div className='flex flex-col gap-3'>
			{path === Path.CLIENT_DETAILS && <ClientDetailsComponent />}
			{path === Path.RECEIPT_ITEM && <AddReceiptItems />}
			{path === Path.PAYMENT && <AddPaymentDetails />}
			{path === Path.CONTROL_UNIT && <ControlUnitComponent />}
			{path === Path.LOYALTY_POINTS && <LoyaltyPointsComponent />}
		</div>
	);
};

export default GenerateSuperMarketTemplate;
