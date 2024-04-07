'use client';
import {receiptItemAtom, receiptItemsAtom} from '@/atoms/receiptitem';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {Plus} from 'lucide-react';
import {useFieldArray, useForm, useFormContext} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import ListItems from './listitems';

const AddReceiptItems = () => {
	const formSchema = z.object({
		item: z.string().min(1, {message: 'Name is required'}),
		quantity: z
			.string()
			.min(1, {message: 'Quantity is required'})
			.refine((value) => !isNaN(Number(value)), {message: 'Quantity must be a number'}),
		price: z
			.string()
			.min(1, {message: 'Quantity is required'})
			.refine((value) => !isNaN(Number(value)), {message: 'Quantity must be a number'}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			item: '',
			quantity: '',
			price: '',
		},
	});

	const {setValue} = useForm();

	const [_, setItems] = useAtom(receiptItemsAtom);

	const addItem = (data: z.infer<typeof formSchema>) => {
		setItems((prev) => [...prev, data]);
		form.reset();
	};

	const handleItem = (data: z.infer<typeof formSchema>) => {
		setValue('item', data.item);
	};

	return (
		<Form {...form}>
			<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(addItem)}>
				<fieldset className='grid gap-6 rounded-lg border p-4'>
					<legend className='-ml-1 px-1 text-sm font-medium capitalize'>items sold</legend>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='item'
							render={({field}) => (
								<FormItem>
									<FormLabel>Item</FormLabel>
									<FormControl>
										<Input placeholder='Add Receipt Item' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='quantity'
							render={({field}) => (
								<FormItem>
									<FormLabel>Quantity</FormLabel>
									<FormControl>
										<Input placeholder='Number of items sold' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='price'
							render={({field}) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input placeholder='Price of item sold' {...field} />
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
							Add Item
						</Button>
					</div>
					<ListItems handleItem={handleItem} />
				</fieldset>
			</form>
		</Form>
	);
};

export default AddReceiptItems;
