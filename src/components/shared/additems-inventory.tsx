'use client';
import {receiptItemsAtom} from '@/atoms/receiptgen/receiptitem';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {ArrowLeft, ArrowRight, Check, ChevronsUpDown, Plus} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import ListItems from './listitems';
import {useToast} from '../ui/use-toast';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import {Progress} from '../ui/progress';
import {Product} from '@/models/inventory/product';
import {FC, useEffect, useMemo, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {cn} from '@/lib/utils';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '../ui/command';

interface Props {
	products: Product[];
}

const AddReceiptItemsInventory: FC<Props> = ({products}) => {
	const [selected, setSelected] = useState<string>('');

	const [product, setProduct] = useState<Product | null>(null);

	const fProducts = useMemo(
		() =>
			products.map((product) => ({
				value: product.id,
				label: product.variant_name,
			})),
		[products]
	);

	const formSchema = z
		.object({
			item: z.string().min(1, {message: 'Item name is required'}),
			quantity: z
				.string()
				.min(1, {message: 'Quantity is required'})
				.refine((value) => !isNaN(Number(value)), {message: 'Quantity must be a number'}),
			price: z
				.string()
				.min(1, {message: 'Price is required'})
				.refine((value) => !isNaN(Number(value)), {message: 'Price must be a number'}),

			discount: z
				.string()
				.min(1, {message: 'Discount is required. If you are not providing a discount, enter 0'})
				.refine((value) => !isNaN(Number(value)), {message: 'Price must be a number'}),
		})
		.refine((data) => +data.discount <= +data.price, {message: 'Discount cannot be greater than price'})
		.refine((data) => +data.discount <= product?.discount!, {
			message: 'Discount cannot be greater than product discount',
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			item: '',
			quantity: '',
			price: '',
			discount: '',
		},
	});

	const [items, setItems] = useAtom(receiptItemsAtom);

	const [__, setPath] = useAtom(navigateAtom);

	const {toast} = useToast();

	useEffect(() => {
		const product = products.find((product) => product.id === selected);

		if (!product) return;

		setProduct(product);

		form.setValue('price', product.price.toString(), {
			shouldValidate: true,
			shouldDirty: true,
		});

		form.setValue('discount', product.discount.toString(), {
			shouldValidate: true,
			shouldDirty: true,
		});

		form.trigger();
	}, [form, selected, products]);

	const addItem = (data: z.infer<typeof formSchema>) => {
		const {item} = data;

		const product = products.find((product) => product.id === item);
		if (!product) return;

		setItems((prev) => [
			...prev,
			{
				...data,
				item: product.variant_name,
				itemId: product.id,
				price: product.price,
				discount: Number(data.discount),
				quantity: Number(data.quantity),
			},
		]);
		toast({
			title: 'Success!',
			description: 'You have successfully added a receipt item',
		});
		form.reset();
	};

	return (
		<>
			<div className='p-4 pt-0'>
				<Progress value={40} />
			</div>

			<Form {...form}>
				<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(addItem)}>
					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-sm font-medium capitalize'>items sold</legend>
						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='item'
								render={({field}) => (
									<FormItem className='flex flex-col mt-3'>
										<FormLabel>Product</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														role='combobox'
														className={cn('justify-between', !field.value && 'text-muted-foreground')}>
														{field.value
															? fProducts.find((product) => product.value === field.value)?.label
															: 'Select product from inventory'}
														<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className=' p-0'>
												<Command>
													<CommandInput placeholder='Search item...' className='w-full' />
													<CommandEmpty>No product found</CommandEmpty>
													<CommandGroup>
														{fProducts.map((item) => (
															<CommandItem
																value={item.label}
																key={item.value}
																onSelect={() => {
																	form.setValue('item', item.value);
																	setSelected(item.value);
																}}>
																<Check className={cn('mr-2 h-4 w-4', item.value === field.value ? 'opacity-100' : 'opacity-0')} />
																{item.label}
															</CommandItem>
														))}
													</CommandGroup>
												</Command>
											</PopoverContent>
										</Popover>
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
										<FormLabel>Price Each</FormLabel>
										<FormControl>
											<Input placeholder='Price of item sold' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='discount'
								render={({field}) => (
									<FormItem>
										<FormLabel>Discount</FormLabel>
										<FormControl>
											<Input placeholder='Discount added to item' {...field} />
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
						<ListItems />
					</fieldset>
				</form>
			</Form>
			<div className='flex justify-end items-end p-4 pt-0'>
				<div className='flex flex-row gap-2'>
					<Button onClick={() => setPath(Path.CLIENT_DETAILS)}>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Prev
					</Button>
					<Button onClick={() => setPath(Path.PAYMENT)} disabled={items.length === 0}>
						<ArrowRight className='mr-2 h-4 w-4' />
						Next
					</Button>
				</div>
			</div>
		</>
	);
};

export default AddReceiptItemsInventory;
