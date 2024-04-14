'use client';
import {clientDetailsAtom} from '@/atoms/receiptgen/client-details';
import {navigateAtom, Path} from '@/atoms/receiptgen/navigate';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {ArrowRight} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {Progress} from '../ui/progress';

const formSchema = z.object({
	name: z.string().min(1, {message: 'Name is required'}),
	phone: z
		.string()
		.min(1, {message: "Client's phone number is required"})
		.refine((value) => /^0(1|7)\d{8}$/.test(value ?? ''), 'Invalid phone number'),
	email: z
		.union([
			z.string().length(0),
			z.string().min(1, {message: 'Email is required'}).email({message: 'Invalid email address'}),
		])
		.optional()
		.transform((e) => (e === '' ? undefined : e)),
});

const ClientDetailsComponent = () => {
	const [client, setClientDetails] = useAtom(clientDetailsAtom);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: client.name,
			phone: client.phone,
			email: client.email,
		},
	});

	const [__, setPath] = useAtom(navigateAtom);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		setClientDetails(data);
		setPath(Path.RECEIPT_ITEM);
	};

	return (
		<>
			<div className='p-4 pt-0'>
				<Progress value={20} />
			</div>
			<Form {...form}>
				<form className='grid w-full items-start gap-6 overflow-auto p-4 pt-0' onSubmit={form.handleSubmit(handleSubmit)}>
					<fieldset className='grid gap-6 rounded-lg border p-4'>
						<legend className='-ml-1 px-1 text-sm font-medium capitalize'>Client Details</legend>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='name'
								render={({field}) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Add Client Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='phone'
								render={({field}) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input placeholder='Add Customer Phone Number' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='email'
								render={({field}) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='Add Client Email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex justify-end items-end pt-0'>
							<div className='flex flex-row gap-2'>
								<Button type='submit'>
									<ArrowRight className='mr-2 h-4 w-4' />
									Next
								</Button>
							</div>
						</div>
					</fieldset>
				</form>
			</Form>
		</>
	);
};

export default ClientDetailsComponent;
