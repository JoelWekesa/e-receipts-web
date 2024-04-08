import AddReceiptItems from '@/components/shared/additems';
import AddPaymentDetails from '@/components/shared/payments';

const GenerateSuperMarketTemplate = () => {
	return (
		<div className='flex flex-col gap-3'>
			<div>
				<AddReceiptItems />
			</div>

			<div>
				<AddPaymentDetails />
			</div>
		</div>
	);
};

export default GenerateSuperMarketTemplate;
