'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {Category} from '@/models/inventory/category';
import {Check, ChevronsUpDown} from 'lucide-react';
import {FC, useMemo} from 'react';
import {UseFormReturn} from 'react-hook-form';

const SelectProductCategory: FC<{
	categories: Category[];
	form: UseFormReturn<
		{name: string; description?: string | undefined; category: string; images?: File[]; thumbnail?: File; price?: string},
		any,
		undefined
	>;
}> = ({categories, form}) => {
	const fCategories = useMemo(
		() =>
			categories.map((category) => ({
				value: category.id,
				label: category.name,
			})),
		[categories]
	);

	return (
		<Card x-chunk='dashboard-07-chunk-2'>
			<CardContent>
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
			</CardContent>
		</Card>
	);
};

export default SelectProductCategory;
