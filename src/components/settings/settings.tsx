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
import {FC, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '../ui/command';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import ResetComponent from '../profile/reset-password';
import {H1} from '../titles';

const formSchema = z.object({
	store: z.string({
		required_error: 'Store is required',
	}),
});

const SettingsComponent: FC<{stores: Store[]; setting: Setting; token: string}> = ({stores, setting, token}) => {
	const {mutate, isPending} = useUpsertSettings();

	const {data: userSetting} = useSetting(setting);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			store: userSetting?.storeId || '',
		},
	});

	const [activeTab, setActiveTab] = useState('general');

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({
			store_id: data.store,
			token,
		});
	};

	const storeItems = stores.map((store) => ({
		label: store.displayName,
		value: store.id,
	}));

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  p-2 md:gap-8 md:p-10'>
				<div className='mx-auto grid w-full max-w-6xl gap-2'>
					<H1 className='text-3xl font-semibold'>Settings</H1>
				</div>
				<div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
					<nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'general' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('general')}>
							General
						</Link>
						<Link
							href='#'
							className={`font-semibold ${activeTab === 'security' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('security')}>
							Security
						</Link>
						{/* <Link
							href='#'
							className={`font-semibold ${activeTab === 'support' ? 'text-primary' : 'text-muted-foreground'}`}
							onClick={() => setActiveTab('support')}>
							Support
						</Link> */}
					</nav>
					<div className='grid gap-6'>
						{activeTab === 'general' && (
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
						)}
						{activeTab === 'security' && <ResetComponent token={token} />}
					</div>
				</div>
			</main>
		</div>
	);
};

export default SettingsComponent;
