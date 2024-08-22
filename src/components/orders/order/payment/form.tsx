'use client';
import {Checkbox} from '@/components/ui/checkbox';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {ClientOrder} from '@/models/orders/order-client';
import {FC, useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';

interface Props {
	order: ClientOrder;
}

interface Client {
	name: string;
	phone: string;
}

const AddPaymentDetails: FC<Props> = ({order}) => {
	const [checked, setChecked] = useState(false);

	const [client, setClient] = useState<Client>({
		name: '',
		phone: '',
	});

	useEffect(() => {
		setClient({
			name: order.shipping.firstName + ' ' + order.shipping.lastName,
			phone: order.shipping.phone,
		});
	}, [order]);

	const form = useFormContext();

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

	return (
		<div>
			<div className='p-1'>
				<fieldset className='grid gap-6 '>
					<legend className='-ml-1 px-1 py-2 text-sm font-medium capitalize'>Payment Details</legend>
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
		</div>
	);
};

export default AddPaymentDetails;
