import optionsAtom from '@/atoms/inventory/options';
import {Button} from '@/components/ui/button';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent} from '@/components/ui/popover';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils';
import {PopoverTrigger} from '@radix-ui/react-popover';
import {useAtom} from 'jotai';
import {Check, ChevronsUpDown} from 'lucide-react';
import {useFieldArray, useFormContext} from 'react-hook-form';

const AddVariant = () => {
	const form = useFormContext();

	const {update} = useFieldArray({
		name: 'name',
		control: form.control,
	});

	const [options, _] = useAtom(optionsAtom);

	const nonEmptyOptions = options.filter((option) => option.options.length > 0);

	return (
		<div className='grid gap-6'>
			<div className='grid gap-3'>
				<div className='grid gap-2 grid-cols-2'>
					{nonEmptyOptions.map((option, index) => (
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
					name='discount'
					control={form.control}
					rules={{required: true}}
					render={({field}) => (
						<FormItem>
							<FormLabel>Variant Discount</FormLabel>
							<FormControl>
								<Input id='discount' placeholder='0.00' {...field} required />
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
	);
};

export default AddVariant;
