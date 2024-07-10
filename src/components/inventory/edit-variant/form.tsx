'use client';
import PageLoader from '@/components/shared/pageloader';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent} from '@/components/ui/popover';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils';
import {Variant} from '@/models/inventory/inventory';
import {Option} from '@/models/inventory/option';
import useVariant from '@/services/inventory/variants/get-variant';
import useUpdateVariant from '@/services/inventory/variants/update';
import {positiveNumberRegex} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {PopoverTrigger} from '@radix-ui/react-popover';
import {Check, ChevronsUpDown, Edit, Loader2} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {z} from 'zod';

interface Props {
	variant: Variant;
	options: Option[];
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

const EditVariant: FC<Props> = ({variant, options}) => {
	const {data, isLoading} = useVariant({id: variant?.id || '', variant});

	const {data: session} = useSession({required: true});

	const token = session?.accessToken || '';

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data?.name || [],
			price: (data?.price || 0).toString(),
			quantity: (data?.quantity || 0).toString(),
			warnLevel: (data?.warnLevel || 0).toString(),
			description: data?.description || '',
		},
	});

	const {update} = useFieldArray({
		name: 'name',
		control: form.control,
	});

	const {mutate: edit, isPending} = useUpdateVariant();

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const curr = {
			...data,
			id: variant?.id || '',
			price: Number(data.price),
			quantity: Number(data.quantity),
			warnLevel: Number(data.warnLevel),
			inventoryId: variant?.inventoryId || '',
			storeId: variant?.storeId || '',
		};

		edit({
			variant: curr,
			token,
		});
	};

	if (isLoading) return <PageLoader />;

	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Variant</CardTitle>
				<CardDescription>Add a new product variant</CardDescription>
			</CardHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<CardContent>
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
					</CardContent>
					<CardFooter>
						<Button type='submit'>
							{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
							<Edit className='h-3.5 w-3.5' /> Update Variant
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

export default EditVariant;
