'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import useRegisterUser from '@/services/auth/register';
import {passwordPattern, phoneNumberPattern, usernamePattern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {signIn} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Dropzone from 'react-dropzone';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const formSchema = z
	.object({
		phone: z.string().refine(() => phoneNumberPattern, {
			message: 'Please enter a valid phone number',
		}),

		f_name: z.string().min(1, {message: 'First name is required'}),

		l_name: z.string().min(1, {message: 'Last name is required'}),

		password: z.string().regex(passwordPattern, {
			message: 'Please enter a valid password',
		}),

		confirm: z.string().regex(passwordPattern, {
			message: 'Please enter a valid password',
		}),

		email: z.string().email({message: 'Invalid email address'}).optional(),

		username: z.string().refine(() => usernamePattern, {
			message: 'Please enter a valid username',
		}),

		image: z
			.instanceof(File, {message: 'File is required'})
			.refine((file) => {
				if (file) {
					return file.size <= MAX_UPLOAD_SIZE;
				} else {
					return true;
				}
			}, 'File size must be less than 5MB')
			.refine((file) => {
				if (file) {
					return ACCEPTED_FILE_TYPES.includes(file.type);
				}
			}, 'File must be an image'),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm'],
	});

const RegisterForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: '',
			f_name: '',
			l_name: '',
			password: '',
			email: '',
			username: '',
		},
	});

	const isLoggedIn = async () => {
		await signIn('credentials', {
			redirect: true,
			username: form.getValues('username'),
			password: form.getValues('password'),
			callbackUrl: '/',
		});
	};

	const {mutate: registerUser, isPending} = useRegisterUser(isLoggedIn);

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		registerUser(data);
	};
	return (
		<Card className='mx-auto max-w-sm md:max-w-lg'>
			<CardHeader>
				<CardTitle className='text-xl'>Sign Up</CardTitle>
				<CardDescription>Enter your information to create an account</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='grid gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<FormField
									control={form.control}
									name='f_name'
									render={({field}) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input id='first-name' placeholder='John' {...field} required />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='grid gap-2'>
								<FormField
									control={form.control}
									name='l_name'
									render={({field}) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input id='last-name' placeholder='Doe' {...field} required />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='phone'
								render={({field}) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input id='phone-number' placeholder='0712345678' {...field} required />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='username'
								render={({field}) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input id='user-name' placeholder='johndoe' {...field} required />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='email'
								render={({field}) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input id='email' placeholder='johndoe@email.com' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='image'
								render={() => (
									<Dropzone
										accept={{
											'image/*': ['.png'],
										}}
										multiple={true}
										maxSize={1024 * 1024 * 5}
										onDropAccepted={(items) => form.setValue('image', items[0])}>
										{({getRootProps, getInputProps}) => (
											<div className='w-full flex justify-center items-center'>
												<div
													{...getRootProps()}
													className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col '>
													<input {...getInputProps()} />

													{form?.getValues('image') ? (
														<div className='flex flex-initial justify-items-start flex-row gap-5'>
															<Image
																src={URL.createObjectURL(form?.getValues('image')!)}
																width={100}
																height={100}
																alt='store'
																style={{
																	borderRadius: '15%',
																}}
															/>
															<div className='flex flex-col justify-center items-center'>
																<p>{`Drag 'n' drop your photo here, or click to select photo`}</p>
															</div>
														</div>
													) : !!form?.formState?.errors?.image?.message ? (
														<div className='justify-center items-center'>
															<p className='text-red-600 text-center'>{`Drag 'n' drop your logo here, or click to select file`}</p>
														</div>
													) : (
														<div className='justify-center items-center'>
															<p className='text-center'>{`Drag 'n' drop your photo here, or click to select photo`}</p>
														</div>
													)}
												</div>
											</div>
										)}
									</Dropzone>
								)}
							/>
							<FormDescription>Upload a new image (max 5MB)</FormDescription>
							<FormMessage />
							{JSON.stringify(form.formState.errors.image)}
						</div>

						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='password'
								render={({field}) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input id='password' {...field} type='password' />
										</FormControl>
										<FormMessage />
										<FormDescription>
											<ol>
												<li>Minimum Length: The password must be at least 8 characters long.</li>
												<li>Uppercase Letter: The password must contain at least one uppercase letter (A-Z).</li>
												<li>Lowercase Letter: The password must contain at least one lowercase letter (a-z).</li>
												<li>Digit: The password must contain at least one digit (0-9).</li>
												<li>Special Character: The password must contain at least one special character from the set @$!%*?&.</li>
											</ol>
										</FormDescription>
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-2'>
							<FormField
								control={form.control}
								name='confirm'
								render={({field}) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input id='confirm' {...field} type='password' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='grid gap-4'>
							<Button type='submit' className='w-full' disabled={isPending}>
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								Create an account
							</Button>
						</div>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Link href='/auth/login' className='underline'>
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};

export default RegisterForm;
