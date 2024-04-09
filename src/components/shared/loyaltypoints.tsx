'use client';
import {Loyalty, loyaltyAtom} from '@/atoms/receiptgen/loyalty';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {ArrowLeft, ArrowRight, Plus, Receipt} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import LoyaltyControlItems from './loyaltycontrolitems';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import {ReceiptItem, receiptItemsAtom} from '@/atoms/receiptgen/receiptitem';
import {Payment, paymentAtom} from '@/atoms/receiptgen/payment';
import {ControlUnit, controlUnitAtom} from '@/atoms/receiptgen/controlunit';
import {Progress} from '../ui/progress';
import {ClientDetails, clientDetailsAtom} from '@/atoms/receiptgen/client-details';

interface Receipt {
	client_details: ClientDetails;
	items: ReceiptItem[];
	payment: Payment;
	control_units: ControlUnit[];
	loyalty: Loyalty[];
}

const formSchema = z.object({
	code: z.string().min(1, {message: 'Code is required'}),
	customer: z.string().min(1, {message: 'Customer is required'}),
	points_earned: z.string().min(1, {message: 'Points earned is required'}),
});

const LoyaltyPointsComponent = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: '',
			customer: '',
			points_earned: '',
		},
	});

	const [client_details] = useAtom(clientDetailsAtom);
	const [items] = useAtom(receiptItemsAtom);
	const [payment] = useAtom(paymentAtom);
	const [controlUnits] = useAtom(controlUnitAtom);
	const [loyaltyPoints, setLoyaltyPoints] = useAtom(loyaltyAtom);

	const handleReceipt = () => {
		const data: Receipt = {
			client_details,
			items,
			payment,
			control_units: controlUnits,
			loyalty: loyaltyPoints,
		};

		console.log(data);
	};

	const [__, setPath] = useAtom(navigateAtom);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		setLoyaltyPoints([
			{
				...data,
				points_earned: Number(data.points_earned),
			},
		]);

		form.reset();
	};

	return (
		<>
			<div className='p-4 pt-0'>
				<Progress value={100} />
			</div>
			<Form {...form}>
				<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(handleSubmit)}>
					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-sm font-medium capitalize'>Loyalty Points</legend>

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
						<div className='grid gap-3'>
							<Button type='submit'>
								{' '}
								<Plus className='mr-2 h-4 w-4' />
								Add Loyalty Points
							</Button>
						</div>
						<LoyaltyControlItems />
					</fieldset>
				</form>
			</Form>
			<div className='flex justify-end items-end p-4 pt-0'>
				<div className='flex flex-row gap-2'>
					<Button onClick={() => setPath(Path.CONTROL_UNIT)}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Prev
					</Button>
					<Button onClick={handleReceipt}>
						<Receipt className='mr-2 h-4 w-4' />
						Send Receipt
					</Button>
				</div>
			</div>
		</>
	);
};

export default LoyaltyPointsComponent;
