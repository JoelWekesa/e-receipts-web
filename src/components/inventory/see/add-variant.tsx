'use client';
import {openAddVariant} from '@/atoms/inventory/open-add-varaint';
import variantsAtom from '@/atoms/inventory/variants';
import {Button} from '@/components/ui/button';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils';
import {Inventory} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import useAddVariant from '@/services/inventory/variants/add';
import {positiveNumberRegex} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {Check, ChevronsUpDown, Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {z} from 'zod';

interface Props {
	options: Option[];
	inventory: Inventory;
}

const formSchema = z.object({
	name: z.array(z.object({name: z.string(), value: z.string()})),
	price: z.string({required_error: 'Please enter a variant price'}).regex(positiveNumberRegex, {
		message: 'Please enter a valid price',
	}),
	quantity: z.string({required_error: 'Please enter a variant quantity'}).regex(positiveNumberRegex, {
		message: 'Please enter a valid quantity',
	}),
	warnLevel: z
		.string()
		.regex(positiveNumberRegex, {
			message: 'Please enter a valid warn level',
		})
		.optional(),
	description: z.string().optional(),
});

const AddVariant: FC<Props> = ({options, inventory}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: [],
			price: '',
			quantity: '',
			warnLevel: '',
			description: '',
		},
	});

	const [open, setOpen] = useAtom(openAddVariant);

	const [variants, setVariants] = useAtom(variantsAtom);

	const {update} = useFieldArray({
		name: 'name',
		control: form.control,
	});

	// const [options, _] = useAtom(optionsAtom);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const successFn = () => {
		setOpen(false);
		form.reset();
	};

	const {mutate: add, isPending} = useAddVariant(successFn);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const curr = {
			...data,
			price: Number(data.price),
			quantity: Number(data.quantity),
			warnLevel: Number(data.warnLevel),
			inventoryId: inventory?.id || '',
			storeId: inventory?.storeId || '',
		};

		add({data: curr, token});

		setVariants([...variants, {...curr, inventoryId: inventory?.id || ''}]);
		// form.reset();
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)}>Add Variant</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[625px] overflow-y-auto max-h-screen'>
				<DialogHeader>
					<DialogTitle>Product Variant</DialogTitle>
					<DialogDescription>Add a new product variant</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<div className='grid gap-6'>
							<div className='grid gap-3'>
								<div className='grid gap-2 grid-cols-2'>
									{options.map((option, index) => (
										<div className='flex w-full' key={option.id}>
											<FormField
												control={form.control}
												name='name'
												render={({field}) => (
													<FormItem className='flex flex-col mt-3 w-full'>
														<FormLabel>{option.name.slice(0, 1).toUpperCase() + option.name.slice(1)}</FormLabel>
														<Popover>
															<PopoverTrigger asChild>
																<FormControl>
																	<Button
																		variant='outline'
																		role='combobox'
																		className={cn('justify-between', !field.value && 'text-muted-foreground')}>
																		{field.value
																			? option.options.find((item) => item === field.value[index]?.value)
																			: `Select ${option.name}`}
																		<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
																	</Button>
																</FormControl>
															</PopoverTrigger>
															<PopoverContent className=' p-0'>
																<Command>
																	<CommandInput placeholder={`Search ${option.name}...`} />
																	<CommandEmpty>No option found</CommandEmpty>
																	<CommandGroup>
																		{option.options.map((item) => (
																			<CommandItem
																				value={item}
																				key={item}
																				onSelect={() => {
																					update(index, {
																						name: option.name,
																						value: item,
																					});
																				}}>
																				<Check className={cn('mr-2 h-4 w-4', item === field.name ? 'opacity-100' : 'opacity-0')} />
																				{item}
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
									))}
								</div>
							</div>
							<div className='grid gap-3'>
								<FormField
									name='price'
									control={form.control}
									rules={{required: true}}
									render={({field}) => (
										<FormItem>
											<FormLabel>Variant Price</FormLabel>
											<FormControl>
												<Input id='price' placeholder='0.00' {...field} required />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='grid gap-3'>
								<FormField
									name='quantity'
									control={form.control}
									rules={{required: true}}
									render={({field}) => (
										<FormItem>
											<FormLabel>Variant Quantity</FormLabel>
											<FormControl>
												<Input id='quantity' placeholder='Variant Quantity' {...field} required />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='grid gap-3'>
								<FormField
									name='warnLevel'
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Warn Level</FormLabel>
											<FormControl>
												<Input id='warnLevel' placeholder='Warn Level' {...field} required />
											</FormControl>
											<FormDescription>Set the warn level for this variant.</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='grid gap-3'>
								<FormField
									name='description'
									control={form.control}
									rules={{required: true}}
									render={({field}) => (
										<FormItem>
											<FormLabel>Variant Description</FormLabel>
											<FormControl>
												<Textarea id='description' placeholder='Variant Description' {...field} required />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>

						<DialogFooter className='my-4'>
							<Button type='button' variant='destructive' onClick={handleClose}>
								Cancel
							</Button>
							<Button type='submit'>
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								Add Variant
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddVariant;
