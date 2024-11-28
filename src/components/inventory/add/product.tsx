'use client';
import addImagesAtom, {thumbnailAtom} from '@/atoms/inventory/addimage';
import optionsAtom from '@/atoms/inventory/options';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Popover, PopoverTrigger} from '@/components/ui/popover';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils';
import {Category} from '@/models/inventory/inventory';
import {PopoverContent} from '@radix-ui/react-popover';
import {useAtom} from 'jotai';
import {Check, ChevronsUpDown} from 'lucide-react';
import {FC, useEffect, useMemo} from 'react';
import {useFormContext} from 'react-hook-form';

interface Props {
	categories: Category[];
}

export const AddProductComponent: FC<Props> = ({categories}) => {
	const [_, setImages] = useAtom(addImagesAtom);
	const [__, setOptions] = useAtom(optionsAtom);
	const [___, setThumbnail] = useAtom(thumbnailAtom);

	useEffect(() => {
		setImages([]);
		setOptions([]);
		setThumbnail(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fCategories = useMemo(
		() =>
			categories.map((category) => ({
				value: category.id,
				label: category.name,
			})),
		[categories]
	);

	const form = useFormContext();

	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>Add a new product to your store</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-6'>
					<div className='grid gap-3'>
						<FormField
							name='name'
							control={form.control}
							rules={{
								required: true,
							}}
							render={({field}) => (
								<FormItem>
									<FormLabel>Product Name</FormLabel>
									<FormControl>
										<Input id='name' placeholder='Product Name' {...field} required />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-3'>
						<FormField
							name='description'
							control={form.control}
							render={({field}) => (
								<FormItem>
									<FormLabel>Product Description</FormLabel>
									<FormControl>
										<Textarea id='description' placeholder='Product Description' {...field} rows={5} />
									</FormControl>
									<FormDescription>
										Give your product a short and clear description. 120-160 characters is the recommended length for search
										engines.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* <div className='grid gap-3'>
						<FormField
							name='price'
							control={form.control}
							rules={{
								required: true,
							}}
							render={({field}) => (
								<FormItem>
									<FormLabel>Product Price</FormLabel>
									<FormControl>
										<Input id='price' placeholder='Product Price' {...field} required />
									</FormControl>
									<FormDescription>
										{`If your product does not have a fixed price, you can leave this field empty. You can then set the price for each product variant.`}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div> */}
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='category'
							render={({field}) => (
								<FormItem className='flex flex-col mt-3'>
									<FormLabel>Product Category</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={cn('justify-between', !field.value && 'text-muted-foreground')}>
													{field.value ? fCategories.find((category) => category.value === field.value)?.label : 'Select category'}
													<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className=' p-0'>
											<Command>
												<CommandInput placeholder='Search category...' />
												<CommandEmpty>No category found</CommandEmpty>
												<CommandGroup>
													{fCategories.map((category) => (
														<CommandItem
															value={category.label}
															key={category.value}
															onSelect={() => {
																form.setValue('category', category.value);
															}}>
															<Check className={cn('mr-2 h-4 w-4', category.value === field.value ? 'opacity-100' : 'opacity-0')} />
															{category.label}
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
				</div>
			</CardContent>
		</Card>
	);
};

export default AddProductComponent;
