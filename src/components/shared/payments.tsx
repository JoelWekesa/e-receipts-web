'use client';
import {paymentAtom, PaymentMethods} from '@/atoms/receiptgen/payment';
import {useAtom} from 'jotai';
import {Checkbox} from '../ui/checkbox';
import CashPaymentDetails from './cash';
import MpesaPaymentDetails from './mpesa';
import {receiptItemsAtom} from '@/atoms/receiptgen/receiptitem';
import {Button} from '../ui/button';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import {Progress} from '../ui/progress';

const AddPaymentDetails = () => {
	const [payment, setPayment] = useAtom(paymentAtom);
	const [receiptItems] = useAtom(receiptItemsAtom);

	const [_, setPath] = useAtom(navigateAtom);

	const handleMethod = (method: PaymentMethods) => {
		if (payment.methods.includes(method)) {
			setPayment({
				...payment,
				methods: payment.methods.filter((m) => m !== method),
				mpesa:
					method === PaymentMethods.MPESA
						? {
								client_name: '',
								mobile_no: '',
								amount: 0,
								m_pesa_transaction_id: '',
						  }
						: payment.mpesa,
				cash: method === PaymentMethods.CASH ? {amount: 0} : payment.cash,
			});
		} else {
			setPayment({...payment, methods: [...payment.methods, method]});
		}
	};

	return (
		<div>
			<div className='p-4 pt-0'>
				<Progress value={60} />
			</div>
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

			<div className='flex justify-end items-end p-4 pt-0'>
				<div className='flex flex-row gap-2'>
					<Button onClick={() => setPath(Path.RECEIPT_ITEM)}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Prev
					</Button>
					<Button
						disabled={payment.cash.amount === 0 && payment.mpesa.amount === 0}
						onClick={() => setPath(Path.CONTROL_UNIT)}>
						<ArrowRight className='mr-2 h-4 w-4' />
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddPaymentDetails;
