'use client';
import {paymentAtom, PaymentMethods} from '@/atoms/payment';
import {useAtom} from 'jotai';
import {Checkbox} from '../ui/checkbox';
import CashPaymentDetails from './cash';
import MpesaPaymentDetails from './mpesa';
import {receiptItemsAtom} from '@/atoms/receiptitem';

const AddPaymentDetails = () => {
	const [payment, setPayment] = useAtom(paymentAtom);
	const [receiptItems] = useAtom(receiptItemsAtom);

	const handleMethod = (method: PaymentMethods) => {
		if (payment.methods.includes(method)) {
			setPayment({
				...payment,
				methods: payment.methods.filter((m) => m !== method),
			});
		} else {
			setPayment({...payment, methods: [...payment.methods, method]});
		}
	};

	return (
		<div>
			<div className='p-4'>
				<fieldset className='grid gap-6 rounded-lg border p-4'>
					<legend className='-ml-1 px-1 text-sm font-medium'>Select Payment Method(s)</legend>
					<div className='flex space-x-2'>
						<Checkbox
							id='cash'
							onCheckedChange={() => handleMethod(PaymentMethods.CASH)}
							checked={payment.methods.includes(PaymentMethods.CASH)}
							disabled={receiptItems.length === 0}
						/>
						<label
							htmlFor='cash'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							Cash
						</label>
					</div>
					<div className='flex space-x-2'>
						<Checkbox
							id='mpesa'
							onCheckedChange={() => handleMethod(PaymentMethods.MPESA)}
							checked={payment.methods.includes(PaymentMethods.MPESA)}
							disabled={receiptItems.length === 0}
						/>
						<label
							htmlFor='mpesa'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
							M-Pesa
						</label>
					</div>
				</fieldset>
			</div>
			{payment.methods.includes(PaymentMethods.CASH) && <CashPaymentDetails />}
			{payment.methods.includes(PaymentMethods.MPESA) && <MpesaPaymentDetails />}
		</div>
	);
};

export default AddPaymentDetails;
