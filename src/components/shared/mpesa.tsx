'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {Plus} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {useAtom} from 'jotai';
import {paymentAtom, PaymentMethods} from '@/atoms/payment';

const formSchema = z.object({
	name: z.string().min(1, {message: "Client's name is required"}),
	mobile_no: z
		.string()
		.min(1, {message: "Client's phone number is required"})
		.refine((value) => !isNaN(Number(value)), {
			message: 'Phone number must be a number',
		}),
	m_pesa_transaction_id: z.string().min(1, {message: 'Mpesa Transaction ID is required'}),
	amount: z
		.string()
		.min(1, {message: 'Amount is required'})
		.refine((value) => !isNaN(Number(value)), {message: 'Amount must be a number'}),
});

const MpesaPaymentDetails = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			mobile_no: '',
			m_pesa_transaction_id: '',
			amount: '',
		},
	});

	const [payment, setPayment] = useAtom(paymentAtom);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		setPayment({
			...payment,
			client_name: data.name,
			mobile_no: data.mobile_no,
			m_pesa_transaction_id: data.m_pesa_transaction_id,
			amount: {
				...payment.amount,
				mpesa: Number(data.amount),
			},
		});
	};

	return (
		<Form {...form}>
			<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(handleSubmit)}>
				<fieldset className='grid gap-6 rounded-lg border p-4'>
					<legend className='-ml-1 px-1 text-sm font-medium capitalize'>M-Pesa Details</legend>

					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='name'
							render={({field}) => (
								<FormItem>
									<FormLabel>Client Name</FormLabel>
									<FormControl>
										<Input placeholder="Client's Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='mobile_no'
							render={({field}) => (
								<FormItem>
									<FormLabel>Mobile No.</FormLabel>
									<FormControl>
										<Input placeholder="Add Client's' Phone Number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='m_pesa_transaction_id'
							render={({field}) => (
								<FormItem>
									<FormLabel>M-Pesa Transaction ID</FormLabel>
									<FormControl>
										<Input placeholder='Add M-Pesa Transaction ID' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='amount'
							render={({field}) => (
								<FormItem>
									<FormLabel>Amount Paid</FormLabel>
									<FormControl>
										<Input placeholder='Add Amount Paid' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit'>
						{' '}
						<Plus className='mr-2 h-4 w-4' />
						Add M-Pesa Details
					</Button>
				</fieldset>
			</form>
		</Form>
	);
};

export default MpesaPaymentDetails;
