'use client';
import {clientDetailsAtom} from '@/atoms/receiptgen/client-details';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import {paymentAtom, PaymentMethods} from '@/atoms/receiptgen/payment';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Checkbox} from '../ui/checkbox';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {Progress} from '../ui/progress';

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

const AddPaymentDetails = () => {
	const [checked, setChecked] = useState(false);

	const [client] = useAtom(clientDetailsAtom);

	const [_, setPath] = useAtom(navigateAtom);

	const [payment, setPayment] = useAtom(paymentAtom);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cash: payment.methods.includes(PaymentMethods.CASH),
			mpesa: payment.methods.includes(PaymentMethods.MPESA),
			amount: payment.cash.amount > 0 ? '' + payment.cash.amount : '',
			name: payment.mpesa?.client_name ?? '',
			mobile_no: payment.mpesa.mobile_no ?? '',
			m_pesa_transaction_id: payment.mpesa.m_pesa_transaction_id ?? '',
			m_pesa_amount: payment.mpesa.amount > 0 ? '' + payment.mpesa.amount : '',
		},
	});

	useEffect(() => {
		if (checked) {
			form.setValue('name', client.name);
			form.setValue('mobile_no', client.phone);
		} else {
			form.setValue('name', '');
			form.setValue('mobile_no', '');
		}
	}, [checked, client, form]);

	useEffect(() => {
		if (!form.watch('cash')) {
			form.setValue('amount', '');
		}

		if (!form.watch('mpesa')) {
			form.setValue('m_pesa_transaction_id', '');
			form.setValue('m_pesa_amount', '');
			form.setValue('name', '');
			form.setValue('mobile_no', '');
		}
	}, [form]);

	const handleCheck = () => {
		setChecked((prev) => !prev);
	};

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		setPayment({
			...payment,
			cash: {
				amount: Number(data?.amount) || 0,
			},

			methods: [...(data?.cash ? [PaymentMethods.CASH] : []), ...(data?.mpesa ? [PaymentMethods.MPESA] : [])],

			mpesa: {
				client_name: data?.name || '',
				mobile_no: data?.mobile_no || '',
				m_pesa_transaction_id: data?.m_pesa_transaction_id || '',
				amount: Number(data?.m_pesa_amount) || 0,
			},
		});

		setPath(Path.LOYALTY_POINTS);
	};

	return (
		<div>
			<div className='p-4 pt-0'>
				<Progress value={60} />
			</div>
			<Form {...form}>
				<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(handleSubmit)}>
					<div className='p-4'>
						<fieldset className='grid gap-6 rounded-lg border p-4'>
							<legend className='-ml-1 px-1 text-sm font-medium capitalize'>Payment Details</legend>
							<div className='grid gap-3'>
								<FormField
									control={form.control}
									name='cash'
									render={({field}) => (
										<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md'>
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className='space-y-1 leading-none'>
												<FormLabel>Payment made with cash</FormLabel>
											</div>
										</FormItem>
									)}
								/>
							</div>
							<div className='grid gap-3'>
								<FormField
									control={form.control}
									name='mpesa'
									render={({field}) => (
										<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md'>
											<FormControl>
												<Checkbox checked={field.value} onCheckedChange={field.onChange} />
											</FormControl>
											<div className='space-y-1 leading-none'>
												<FormLabel>Payment made with M-Pesa</FormLabel>
											</div>
										</FormItem>
									)}
								/>
							</div>
							{form.watch('cash') && (
								<div className='p-2'>
									<fieldset className='grid gap-6 rounded-lg border p-4'>
										<legend className='-ml-1 px-1 text-sm font-medium capitalize'>Cash Details</legend>
										<div className='grid gap-3'>
											<FormField
												control={form.control}
												name='amount'
												render={({field}) => (
													<FormItem>
														<FormLabel>Cash Paid</FormLabel>
														<FormControl>
															<Input placeholder='Add Amount Paid in Cash' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</fieldset>
								</div>
							)}

							{form.watch('mpesa') && (
								<div className='p-2'>
									<fieldset className='grid gap-6 rounded-lg border p-4'>
										<legend className='-ml-1 px-1 text-sm font-medium capitalize'>M-Pesa Details</legend>
										<div className='grid gap-3 justify-end items-end'>
											<div className='items-top flex space-x-2'>
												<Checkbox id='similar' checked={checked} onCheckedChange={handleCheck} />
												<div className='grid gap-1.5 leading-none'>
													<label
														htmlFor='similar'
														className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
														Use client details
													</label>
												</div>
											</div>
										</div>
										<div className='grid gap-3'>
											<FormField
												control={form.control}
												name='name'
												render={({field}) => (
													<FormItem>
														<FormLabel>Client Name</FormLabel>
														<FormControl>
															<Input placeholder='Add Name of the Client' {...field} />
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
														<FormLabel>Client Phone Number</FormLabel>
														<FormControl>
															<Input placeholder='Add Phone Number of the Client' {...field} />
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
												name='m_pesa_amount'
												render={({field}) => (
													<FormItem>
														<FormLabel>M-Pesa Amount</FormLabel>
														<FormControl>
															<Input placeholder='Add Amount Paid in M-Pesa' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</fieldset>
								</div>
							)}
						</fieldset>
					</div>
					<div className='flex justify-end items-end p-4 pt-0'>
						<div className='flex flex-row gap-2'>
							<Button onClick={() => setPath(Path.RECEIPT_ITEM)}>
								<ArrowLeft className='mr-2 h-4 w-4' />
								Prev
							</Button>
							<Button type='submit'>
								<ArrowRight className='mr-2 h-4 w-4' />
								Next
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default AddPaymentDetails;
