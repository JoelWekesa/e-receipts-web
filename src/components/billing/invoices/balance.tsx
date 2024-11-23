'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {BillingAccount} from '@/models/billing/account';
import {UnpaidInvoices} from '@/models/billing/unpaid';
import useVerifyStatements from '@/services/paystack/verify-payments';
import currencyFormat from '@/utils/currency';
import {FC} from 'react';
import {usePaystackPayment} from 'react-paystack';
import {Paid} from './invoice';
import {useRouter} from 'next/navigation';
import useAUnpaidInvoices from '@/services/invoices/unpaid';

const InvoiceBalance: FC<{unpaid: UnpaidInvoices; token: string; account: BillingAccount}> = ({
	unpaid,
	token,
	account,
}) => {
	const {data, refetch} = useAUnpaidInvoices({token, unpaid, billingAccountId: account.id});

	const formattedAmount = currencyFormat.format(data?.balanceDue || 0);

	const router = useRouter();

	const config = {
		reference: `${new Date().getTime() + Math.floor(100000 + Math.random() * 900000)}`,
		email: account.user.email,
		amount: data?.balanceDue ? data.balanceDue * 100 : 0,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
		currency: 'KES',
	};

	const {mutate, isPending} = useVerifyStatements();

	const onSuccess = async (paid: Paid) => {
		await mutate({
			data: {
				...paid,
				billingAccountId: account.id,
			},
			token,
		});

		await refetch();

		await router.refresh();
	};

	const onClose = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log('closed');
	};

	const initializePayment = usePaystackPayment(config);

	const handlePay = async () =>
		initializePayment({
			onSuccess,
			onClose,
		});

	if (data?.balanceDue === 0) return <></>;

	return (
		<Card className='w-full  overflow-hidden'>
			<div className='absolute inset-0 opacity-50' />
			<CardHeader className='relative'>
				<CardTitle className='text-2xl font-semibold'>Total Amount Owed</CardTitle>
			</CardHeader>
			<CardContent className='relative'>
				<div className='flex items-center justify-center space-x-2'>
					<span className={`text-5xl font-bold ${!isPending ? 'text-red-500' : 'text-muted-foreground'}`}>
						{formattedAmount}
					</span>
				</div>
				<p className='mt-4 text-center text-gray-600 dark:text-slate-300'>
					Please ensure timely payment to avoid any service interruptions
				</p>
			</CardContent>

			<CardFooter className='relative'>
				<Button className='w-full bg-red-500 hover:bg-red-600 text-white' onClick={handlePay} disabled={isPending}>
					Pay Now
				</Button>
			</CardFooter>
		</Card>
	);
};

export default InvoiceBalance;
