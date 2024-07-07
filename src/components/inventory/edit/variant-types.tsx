import inventoryAtom from '@/atoms/inventory/inventory';
import optionsAtom, {Option} from '@/atoms/inventory/options';
import PageLoader from '@/components/shared/pageloader';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import useInventoryOptions from '@/services/inventory/options/all';
import {zodResolver} from '@hookform/resolvers/zod';
import {Separator} from '@radix-ui/react-dropdown-menu';
import {useAtom} from 'jotai';
import {PlusCircle, Trash2} from 'lucide-react';
import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
import {z} from 'zod';

const validationSchema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
		})
		.min(3, {
			message: 'Name must be at least 3 characters',
		}),

	variant: z.string().optional(),

	variants: z.array(z.string()),
});

const EditVariantTypes = () => {
	const [inventory, __] = useAtom(inventoryAtom);

	const form = useForm<z.infer<typeof validationSchema>>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			name: '',
			variant: '',
			variants: [],
		},

		// mode: 'onChange',
	});

	const [variant, setVariant] = useState('');

	const [items, setItems] = useState<string[]>([]);

	useEffect(() => {
		if (variant?.includes(',')) {
			setItems([variant.split(',')[0]]);
			setVariant('');
			form.setValue('variant', '');
		} else {
			setVariant(variant);

			form.setValue('variant', variant);
		}
	}, [variant, form, items]);

	const {data = [], isLoading} = useInventoryOptions({inventoryId: inventory?.inventory?.id || ''});

	const [options, setOptions] = useAtom(optionsAtom);

	const fetchedVariants: Option[] = useMemo(
		() =>
			data.map((item) => ({
				name: item.name,
				id: item.id,
				options: item.options,
			})),
		[data]
	);

	useEffect(() => {
		setOptions(fetchedVariants);
	}, [fetchedVariants, setOptions]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const val = event.target.value;

		if (val.includes(',')) {
			const item = val.split(',')[0].trim().toLowerCase();
			const newItems = [...items, item];

			const newItemsSet = new Set(newItems);
			const newItemsArray = Array.from(newItemsSet);
			setItems(newItemsArray);
			form.setValue('variant', '');
			setVariant('');
			form.setValue('variants', newItemsArray);
		} else {
			setVariant(val);
		}
	};

	const handleRemoveItem = (index: number) => {
		form.setValue('variant', items.filter((_, i) => i !== index).join(','));
		setItems(items.filter((_, i) => i !== index));
	};

	const handleRemoveOption = (id: string) => {
		setOptions(options.filter((o) => o.id !== id));
	};

	const handleSubmit = (data: z.infer<typeof validationSchema>) => {
		const option: Option = {
			name: data.name,
			options: data.variants,
			id: uuidv4(),
		};

		const optionExists = options.find((o) => o.name.trim().toLowerCase() === option.name.toLowerCase());

		if (optionExists) {
			return;
		} else {
			setOptions([...options, option]);
		}

		form.reset();

		setItems([]);

		setVariant('');
	};

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<CardHeader>
						<CardTitle>Product Options </CardTitle>
						<CardDescription>
							<div>
								Add variations of this product. Offer your customers different options for color, format, size, shape, etc.
							</div>

							<div className={`flex flex-col gap-2 ${options.length > 0 ? 'my-8 ' : 'hidden'}`}>
								{options.map((option) => (
									<div className='flex flex-row gap-2 justify-between' key={option.id}>
										<div className='flex w-[15%]'>{option.name}</div>
										<div className='flex flex-row flex-wrap gap-2 justify-start w-[75%]'>
											{option.options.map((item, index) => (
												<div
													className='inline-flex items-center rounded bg-primary px-3 py-2 text-xs font-medium text-primary-foreground mr-1 mb-1'
													key={index}>
													<span>{item}</span>
												</div>
											))}
										</div>
										<div className='flex w-[5%]'>
											<Button
												size='icon'
												variant='ghost'
												className='py-1 mb-1 px-3 mr-1'
												type='button'
												onClick={() => handleRemoveOption(option.id)}>
												<Trash2 className='h-4 w-4 rounded-full ' color='red' />
											</Button>
										</div>
									</div>
								))}
								<Separator />
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex flex-row gap-2 items-start'>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<FormField
									name='name'
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel htmlFor={field.name}>Variant Name</FormLabel>
											<FormControl>
												<Input id='name' placeholder='e.g color' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='grid w-full max-w-sm items-center gap-1.5'>
								<FormField
									name='variant'
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel htmlFor={field.name}>Options (Comma Separated)</FormLabel>
											<FormControl>
												<Input id='variant' placeholder='e.g blue, red' onChange={handleChange} value={variant} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex flex-wrap'>
									{items.map((item, index) => (
										<div
											className='inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground mr-1 mb-1'
											key={index}>
											<span>{item}</span>
											<button
												type='button'
												className='ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
												onClick={() => handleRemoveItem(index)}>
												<XIcon className='h-3 w-3' />
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button className='w-full'>
							<PlusCircle className='mr-2 h-4 w-4' />
							Add Option
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

function XIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M18 6 6 18' />
			<path d='m6 6 12 12' />
		</svg>
	);
}

export default EditVariantTypes;
