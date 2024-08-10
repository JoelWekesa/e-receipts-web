'use client';
import Required from '@/components/shared/required';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {phoneNumberPattern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const formSchema = z.object({
	phone: z.string().refine((value) => phoneNumberPattern.test(value), {
		message: 'Invalid phone number',
	}),

	email: z.string().email().optional(),

	firstName: z.string().min(2).max(255),
	lastName: z.string().min(2).max(255),
	address: z.string().min(2).max(255),
});

const CheckOutForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: '',
			email: '',
			firstName: '',
			lastName: '',
			address: '',
		},
	});

	return (
		<div className='flex flex-col gap-2 w-full'>
			<Form {...form}>
				<form className='flex flex-1 flex-col gap-2 p-2'>
					<section>
						<p className='text-2xl font-semibold'>Contact</p>
						<div className='flex flex-col py-2 gap-5 w-full'>
							<FormField
								name='phone'
								render={({field}) => (
									<FormItem>
										<FormLabel>
											Phone Number <Required />
										</FormLabel>
										<FormControl>
											<Input id='phone' placeholder='0712345678' {...field} required className='flex min-w-full' lg />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								name='email'
								render={({field}) => (
									<FormItem>
										<FormLabel>Email Address (optional)</FormLabel>
										<FormControl>
											<Input id='email' placeholder='johndoe@email.com' {...field} className='flex min-w-full' lg />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</section>
					<section>
						<p className='text-2xl font-semibold'>Shipping Address</p>
						<div className='flex flex-col py-2 gap-5 w-full'>
							<div className='grid md:grid-cols-2 grid-cols-1 w-full gap-3'>
								<FormField
									name='firstName'
									render={({field}) => (
										<FormItem>
											<FormLabel>
												First Name <Required />
											</FormLabel>
											<FormControl>
												<Input id='firstName' placeholder='John' {...field} className='flex min-w-full' lg required />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									name='lastName'
									render={({field}) => (
										<FormItem>
											<FormLabel>
												Last Name <Required />
											</FormLabel>
											<FormControl>
												<Input id='lastName' placeholder='Doe' {...field} className='flex min-w-full' lg required />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								name='address'
								render={({field}) => (
									<FormItem>
										<FormLabel>
											Address <Required />
										</FormLabel>
										<FormControl>
											<Input id='address' placeholder='Roysambu' {...field} className='flex min-w-full' lg required />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								name='address'
								render={({field}) => (
									<FormItem>
										<FormLabel>
											City <Required />
										</FormLabel>
										<FormControl>
											<Input id='city' placeholder='Nairobi' {...field} className='flex min-w-full' lg required />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</section>
					<Button>Confirm Shipping Address</Button>
				</form>
			</Form>
		</div>
	);
};

export default CheckOutForm;
