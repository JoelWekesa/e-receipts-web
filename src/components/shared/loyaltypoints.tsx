'use client';
import {clientDetailsAtom} from '@/atoms/receiptgen/client-details';
import {controlUnitAtom} from '@/atoms/receiptgen/controlunit';
import {loyaltyAtom} from '@/atoms/receiptgen/loyalty';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import {paymentAtom} from '@/atoms/receiptgen/payment';
import {receiptItemsAtom} from '@/atoms/receiptgen/receiptitem';
import {AddReceipt} from '@/models/receipts/add';
import useAddReceipt from '@/services/receipts/add';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {ArrowLeft, Loader2, Receipt} from 'lucide-react';
import {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {Progress} from '../ui/progress';
import LoyaltyControlItems from './loyaltycontrolitems';
import {Checkbox} from '../ui/checkbox';

const formSchema = z
	.object({
		code: z.string().optional(),
		customer: z.string().optional(),
		points_earned: z.string().optional(),
	})
	.refine(
		(data) =>
			!data.customer && !data.points_earned && !data.code ? true : data.customer && data.points_earned && data.code,
		{
			message: 'Please fill all fields',
			path: ['points_earned'],
		}
	);

const LoyaltyPointsComponent: FC<{storeId: string; token: string}> = ({storeId, token}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const [client_details, setClientDetails] = useAtom(clientDetailsAtom);
	const [items, setItems] = useAtom(receiptItemsAtom);
	const [payment, setPayment] = useAtom(paymentAtom);
	const [control_units, setControlUnits] = useAtom(controlUnitAtom);
	const [loyalty, setLoyaltyPoints] = useAtom(loyaltyAtom);

	const successFn = () => {
		setClientDetails({
			name: '',
			phone: '',
			email: '',
		});

		setItems([]);
		setLoyaltyPoints([]);
		setControlUnits([]);
		setPayment({
			cash: {
				amount: 0,
			},
			methods: [],

			mpesa: {
				client_name: '',
				mobile_no: '',
				m_pesa_transaction_id: '',
				amount: 0,
			},
		});
		setPath(Path.CLIENT_DETAILS);
	};

	const {mutate, isPending} = useAddReceipt(successFn);

	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		if (submit) {
			const val: AddReceipt = {
				storeId,
				items,
				loyalty,
				control_units,
				name: client_details.name,
				phone: client_details.phone,
				email: client_details.email,
				cash: payment.cash.amount,
				mpesa: payment.mpesa.amount,
				mpesa_name: payment.mpesa.client_name,
				mpesa_phone_no: payment.mpesa.mobile_no,
				mpesa_transaction_id: payment.mpesa.m_pesa_transaction_id,
			};

			mutate({
				data: val,
				token,
			});
		}

		return () => setSubmit(false);
	}, [submit, storeId, items, loyalty, control_units, client_details, mutate, payment, token]);

	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (checked) {
			form.setValue('customer', client_details.name);
		} else {
			form.setValue('customer', undefined);
		}
	}, [checked, client_details, form]);

	const handleCheck = () => {
		setChecked((prev) => !prev);
	};

	const handleReceipt = (data: z.infer<typeof formSchema>) => {
		if (data.code && data.customer && data.points_earned) {
			setLoyaltyPoints([
				{
					code: data.code || '',
					customer: data.customer || '',
					points_earned: data.points_earned || '',
				},
			]);
		}
		setSubmit(true);
		form.reset();
	};

	const [__, setPath] = useAtom(navigateAtom);

	return (
		<>
			<div className='p-4 pt-0'>
				<Progress value={100} />
			</div>
			<Form {...form}>
				<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(handleReceipt)}>
					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-sm font-medium capitalize'>Loyalty Points</legend>
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
								name='code'
								render={({field}) => (
									<FormItem>
										<FormLabel>Loyalty Code</FormLabel>
										<FormControl>
											<Input placeholder='Add Loyalty Code' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='customer'
								render={({field}) => (
									<FormItem>
										<FormLabel>Customer Name</FormLabel>
										<FormControl>
											<Input placeholder='Add Customer Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='points_earned'
								render={({field}) => (
									<FormItem>
										<FormLabel>Points Earned</FormLabel>
										<FormControl>
											<Input placeholder='Add Points Earned' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-end items-end p-4 pt-0'>
							<div className='flex flex-row gap-2'>
								<Button onClick={() => setPath(Path.CONTROL_UNIT)}>
									<ArrowLeft className='mr-2 h-4 w-4' />
									Prev
								</Button>
								<Button type='submit'>
									{isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Receipt className='mr-2 h-4 w-4' />}
									Send Receipt
								</Button>
							</div>
						</div>
						<LoyaltyControlItems />
					</fieldset>
				</form>
			</Form>
		</>
	);
};

export default LoyaltyPointsComponent;
