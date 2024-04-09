'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {ArrowLeft, ArrowRight, Plus} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {useAtom} from 'jotai';
import {paymentAtom} from '@/atoms/receiptgen/payment';

const formSchema = z.object({
	amount: z
		.string()
		.min(1, {message: 'Amount is required'})
		.refine((value) => !isNaN(Number(value)), {message: 'Amount must be a number'}),
});

const CashPaymentDetails = () => {
	const [payment, setPayment] = useAtom(paymentAtom);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '' + payment.cash.amount,
		},
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		setPayment({
			...payment,
			cash: {
				amount: Number(data.amount),
			},
		});
	};

	return (
		<>
			<Form {...form}>
				<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(handleSubmit)}>
					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-sm font-medium capitalize'>Cash Payment</legend>

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
						<div className='grid gap-3'>
							<Button type='submit'>
								{' '}
								<Plus className='mr-2 h-4 w-4' />
								Add Cash Details
							</Button>
						</div>
					</fieldset>
				</form>
			</Form>
		</>
	);
};

export default CashPaymentDetails;
