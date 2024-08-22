import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form} from '@/components/ui/form';
import {ClientOrder} from '@/models/orders/order-client';
import {OrderStatus} from '@/models/orders/orders-store';
import useProcessOrder from '@/services/orders/process-order.dto';
import {zodResolver} from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {CheckCheck, Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import AddPaymentDetails from './form';

dayjs.extend(relativeTime);

interface Props {
	order: ClientOrder;
}

const formSchema = z
	.object({
		cash: z.boolean().default(false).optional(),
		mpesa: z.boolean().default(false).optional(),
		amount: z.string().optional(),
		name: z.string().optional(),
		mobile_no: z.string().optional(),
		m_pesa_transaction_id: z.string().optional(),
		m_pesa_amount: z.string().optional(),
	})
	.refine((data) => data?.cash || data?.mpesa, {
		message: 'Please select at least one payment method',
		path: ['cash'],
	})
	.refine((data) => (data?.cash ? data.amount !== '' && !isNaN(Number(data.amount)) : true), {
		message: 'Please enter an amount paid in cash',
		path: ['amount'],
	})
	.refine((data) => (data?.mpesa ? data?.name !== '' : true), {
		message: 'Please enter the name of the client',
		path: ['name'],
	})
	.refine((data) => (data?.mpesa ? data?.mobile_no !== '' && /^0(1|7)\d{8}$/.test(data?.mobile_no ?? '') : true), {
		message: 'Please enter a valid phone number of the client',
		path: ['mobile_no'],
	})
	.refine((data) => (data?.mpesa ? data?.m_pesa_transaction_id !== '' : true), {
		message: 'Please enter the Mpesa Transaction ID',
		path: ['m_pesa_transaction_id'],
	})
	.refine((data) => (data?.mpesa ? data.m_pesa_amount !== '' && !isNaN(Number(data.m_pesa_amount)) : true), {
		message: 'Please enter an amount in M-Pesa',
		path: ['m_pesa_amount'],
	});

const PaymentCard: FC<Props> = ({order}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cash: false,
			mpesa: false,
			amount: '',
			name: '',
			mobile_no: '',
			m_pesa_transaction_id: '',
			m_pesa_amount: '',
		},
	});

	const {mutate: process, isPending: loading} = useProcessOrder();

	const {data: session} = useSession({
		required: true,
	});

	const handleProcessOrder = async (data: z.infer<typeof formSchema>) => {
		await process({
			token: session?.accessToken || '',
			id: order.id,
			status: OrderStatus.COMPLETED,
			cash: data?.amount ? +data.amount : 0,
			mpesa: data?.m_pesa_amount ? +data.m_pesa_amount : 0,
			mpesa_name: data?.name,
			mpesa_phone_no: data?.mobile_no,
			mpesa_transaction_id: data?.m_pesa_transaction_id,
		});
	};

	return (
		<Form {...form}>
			<form className='w-full' onSubmit={form.handleSubmit(handleProcessOrder)}>
				<Card x-chunk='dashboard-05-chunk-3'>
					<CardHeader>
						<CardTitle>
							<div className='flex flex-row justify-between p-2'>
								<span>Payment</span>
							</div>
						</CardTitle>
						<CardDescription className='p-2'>Add payment details to complete order</CardDescription>
					</CardHeader>
					<CardContent>
						<AddPaymentDetails order={order} />
					</CardContent>
					<CardFooter>
						<Button type='submit' disabled={loading || order.status === OrderStatus.COMPLETED}>
							{loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <CheckCheck className='h-4 w-4 mr-2' />}
							{OrderStatus.COMPLETED === order.status ? 'Order Completed' : 'Complete Order'}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default PaymentCard;
