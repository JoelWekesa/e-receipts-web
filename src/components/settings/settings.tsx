'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {Setting} from '@/models/setting';
import {Store} from '@/models/store';
import useSetting from '@/services/settings/get';
import useUpsertSettings from '@/services/settings/upsert';
import {zodResolver} from '@hookform/resolvers/zod';
import {Check, ChevronsUpDown, Loader2} from 'lucide-react';
import Link from 'next/link';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '../ui/command';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';

const formSchema = z.object({
	store: z.string({
		required_error: 'Store is required',
	}),
});

const SettingsComponent: FC<{stores: Store[]; setting: Setting}> = ({stores, setting}) => {
	const {mutate, isPending} = useUpsertSettings();

	const {data: userSetting} = useSetting(setting);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			store: userSetting?.storeId || '',
		},
	});

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({
			store_id: data.store,
		});
	};

	const storeItems = stores.map((store) => ({
		label: store.name,
		value: store.id,
	}));

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<h1 className='text-3xl font-semibold'>Settings</h1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
						<Link href='#' className='font-semibold text-primary'>
							General
						</Link>
						<Link href='#'>Security</Link>
						<Link href='#'>Integrations</Link>
						<Link href='#'>Support</Link>
						<Link href='#'>Organizations</Link>
						<Link href='#'>Advanced</Link>
					</nav>
					<div className='grid gap-6'>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(handleSubmit)}>
								<Card x-chunk='dashboard-04-chunk-1'>
									<CardHeader>
										<CardTitle>Default Store</CardTitle>
										<CardDescription>
											A default store will streamline the receipt sending process, eliminating the need to manually select the
											store each time you generate a receipt.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<FormField
											control={form.control}
											name='store'
											render={({field}) => (
												<FormItem className='flex flex-col'>
													<FormLabel>Store</FormLabel>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant='outline'
																	role='combobox'
																	className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}>
																	{field.value ? storeItems.find((item) => item.value === field.value)?.label : 'Select Store'}
																	<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent className='w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]'>
															<Command className='min-w-full'>
																<CommandInput placeholder='Search store...' />
																<CommandEmpty>No store found.</CommandEmpty>
																<CommandGroup className='w-full'>
																	{storeItems.map((store) => (
																		<CommandItem
																			value={store.label}
																			key={store.value}
																			onSelect={() => {
																				form.setValue('store', store.value);
																			}}
																			className='w-full'>
																			<Check className={cn('mr-2 h-4 w-4', store.value === field.value ? 'opacity-100' : 'opacity-0')} />
																			{store.label}
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
									<CardFooter className='border-t px-6 py-4'>
										<Button type='submit' disabled={isPending}>
											{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
											Save
										</Button>
									</CardFooter>
								</Card>
							</form>
						</Form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SettingsComponent;
