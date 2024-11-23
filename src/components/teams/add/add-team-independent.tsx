'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {Store} from '@/models/store';
import {Permission} from '@/models/teams/permissions';
import useUserStores from '@/services/stores/user-stores';
import useAddTeam from '@/services/teams/add';
import {zodResolver} from '@hookform/resolvers/zod';
import {Check, ChevronsUpDown, Loader2, Users} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

interface Props {
	stores: Store[];
	permissions: Permission[];
}

const formSchema = z.object({
	name: z.string({message: 'Team name is required'}),
	storeId: z.string({message: 'Store is required'}),
	permissionId: z.string({message: 'Permission is required'}),
});

const AddTeamIndependentComponent: FC<Props> = ({stores, permissions}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			storeId: '',
			permissionId: '',
		},
	});

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {data: uStores} = useUserStores({initialData: stores, token});

	const fStores = useMemo(() => uStores.map((store) => ({label: store.displayName, value: store.id})), [uStores]);

	const fPermissions = useMemo(
		() => permissions.map((permission) => ({label: permission.permission, value: permission.id})),
		[permissions]
	);

	const handleSuccess = () => {
		form.reset();
		close();
	};

	const {mutate: addTeam, isPending} = useAddTeam(() => handleSuccess());

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		addTeam({
			token,
			...data,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Create a new Team</CardTitle>
						<CardDescription>Create a team to help you manage your stores</CardDescription>
					</CardHeader>
					<CardContent>
						<div>
							<div className='space-y-4 py-2 pb-4'>
								<div className='space-y-2'>
									<FormField
										name='name'
										control={form.control}
										render={({field}) => (
											<FormItem>
												<FormLabel htmlFor='name'>Team Name</FormLabel>
												<FormControl>
													<Input id='name' placeholder='Enter team name' {...field} required />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='space-y-2'>
									<FormField
										control={form.control}
										name='storeId'
										render={({field}) => (
											<FormItem className='flex flex-col mt-3'>
												<FormLabel>Store</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant='outline'
																role='combobox'
																className={cn('justify-between', !field.value && 'text-muted-foreground')}>
																{field.value ? fStores.find((store) => store.value === field.value)?.label : 'Select store'}
																<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className='p-0'>
														<Command>
															<CommandInput placeholder='Search store...' />
															<CommandEmpty>No store found</CommandEmpty>
															<CommandGroup>
																{fStores.map((store) => (
																	<CommandItem
																		value={store.label}
																		key={store.value}
																		onSelect={() => {
																			form.setValue('storeId', store.value);
																		}}>
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
								</div>
								<div className='space-y-2'>
									<FormField
										control={form.control}
										name='permissionId'
										render={({field}) => (
											<FormItem className='flex flex-col mt-3'>
												<FormLabel>Permission</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant='outline'
																role='combobox'
																className={cn('justify-between', !field.value && 'text-muted-foreground')}>
																{field.value
																	? fPermissions.find((permission) => permission.value === field.value)?.label
																	: 'Select permission'}
																<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent className=' p-0'>
														<Command>
															<CommandInput placeholder='Search permission...' />
															<CommandEmpty>No permission found</CommandEmpty>
															<CommandGroup>
																{fPermissions.map((permission) => (
																	<CommandItem
																		value={permission.label}
																		key={permission.value}
																		onSelect={() => {
																			console.log(permission);
																			form.setValue('permissionId', permission.value);
																		}}>
																		<Check
																			className={cn('mr-2 h-4 w-4', permission.value === field.value ? 'opacity-100' : 'opacity-0')}
																		/>
																		{permission.label}
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
						</div>
					</CardContent>
					<CardFooter>
						<Button type='submit' disabled={isPending}>
							{isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Users className='mr-2 h-4 w-4 ' />}Add Team
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default AddTeamIndependentComponent;
