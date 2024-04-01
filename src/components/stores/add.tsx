'use client';
import {zodResolver} from '@hookform/resolvers/zod';
import {FC, ReactNode} from 'react';
import Dropzone from 'react-dropzone';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {useAuth} from '@clerk/nextjs';
import useAddStore from '@/services/stores/add';
import {Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';

const AddStore = () => {
	const {sessionId} = useAuth();

	const router = useRouter();

	console.log({sessionId});

	const MAX_UPLOAD_SIZE = 1024 * 1024 * 1.8; // 1.8MB
	const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
	const regex = /^(07|01)\d{8}$/;
	const formSchema = z.object({
		name: z.string().min(1, {message: 'Name is required'}),
		address: z.string().min(1, {message: 'Address is required'}),
		phone: z.string().min(1, {message: 'Phone is required'}).regex(regex, {message: 'Invalid phone number'}),
		email: z.string().min(1, {message: 'Email is required'}).email({message: 'Invalid email'}),
		logo: z
			.instanceof(File, {message: 'File is required'})
			.refine((file) => {
				return !file || file.size <= MAX_UPLOAD_SIZE;
			}, 'File size must be less than 3MB')
			.refine((file) => {
				return ACCEPTED_FILE_TYPES.includes(file.type);
			}, 'File must be an image'),

		pin_no: z.optional(z.string()),
		vat_reg_no: z.optional(z.string()),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			address: '',
			phone: '',
			email: '',
			pin_no: '',
			vat_reg_no: '',
			logo: undefined,
		},
	});

	const successFn = () => {
		form.reset();
		router.push('/stores/all?page=1');
	};

	const {mutate, isPending} = useAddStore(successFn);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		mutate(data);
	};

	return (
		<div className='flex flex-col gap-5 xl:gap-6 container'>
			<Form {...form}>
				<form className='space-y-8' onSubmit={form.handleSubmit(handleSubmit)} suppressHydrationWarning>
					<RowWrap>
						<InnerRowWrap>
							<FormField
								control={form.control}
								name='name'
								render={({field}) => (
									<FormItem>
										<FormLabel>Store Name</FormLabel>
										<FormControl>
											<Input placeholder='Shop Name' {...field} />
										</FormControl>
										<FormDescription>
											{`This is your store's public display name.  You can only change this once every
								30 days.`}
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</InnerRowWrap>

						<InnerRowWrap>
							<FormField
								control={form.control}
								name='address'
								render={({field}) => (
									<FormItem>
										<FormLabel>Store Address</FormLabel>
										<FormControl>
											<Input placeholder='Shop Address' {...field} className='w:full' />
										</FormControl>
										{/* <FormDescription>Enter the physical address of your store</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>
						</InnerRowWrap>
					</RowWrap>

					<RowWrap>
						<InnerRowWrap>
							<FormField
								control={form.control}
								name='phone'
								render={({field}) => (
									<FormItem>
										<FormLabel>Store Phone Number</FormLabel>
										<FormControl>
											<Input placeholder='Store Phone Number' {...field} />
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</InnerRowWrap>

						<InnerRowWrap>
							<FormField
								control={form.control}
								name='email'
								render={({field}) => (
									<FormItem>
										<FormLabel>Store Email Address</FormLabel>
										<FormControl>
											<Input placeholder='Store Email Address' {...field} />
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</InnerRowWrap>
					</RowWrap>

					<RowWrap>
						<InnerRowWrap>
							<FormField
								control={form.control}
								name='pin_no'
								render={({field}) => (
									<FormItem>
										<FormLabel>Store Pin No</FormLabel>
										<FormControl>
											<Input placeholder='Store Pin Number' {...field} />
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</InnerRowWrap>

						<InnerRowWrap>
							<FormField
								control={form.control}
								name='vat_reg_no'
								render={({field}) => (
									<FormItem>
										<FormLabel>Store VAT Registration Number</FormLabel>
										<FormControl>
											<Input placeholder='Store VAT Registration Number' {...field} />
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</InnerRowWrap>
					</RowWrap>

					<RowWrap>
						<InnerRowWrap>
							<FormField
								control={form.control}
								name='logo'
								render={() => (
									<Dropzone
										accept={{
											'image/*': ['.png'],
										}}
										multiple={true}
										maxSize={3000000}
										onDropAccepted={(items) => form.setValue('logo', items[0])}>
										{({getRootProps, getInputProps}) => (
											<div className='w-full flex justify-center items-center'>
												<div
													{...getRootProps()}
													className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col justify-center items-center'>
													<input {...getInputProps()} />
													<p className='text-gray-600'>
														{form?.getValues('logo') ? (
															<div className='mt-4'>
																<h2 className='text-xl font-bold mb-2'>Uploaded File:</h2>
																<p className='text-gray-600'>{form?.getValues('logo').name}</p>
															</div>
														) : !!form?.formState?.errors?.logo?.message ? (
															<p className='text-red-600'>{`Drag 'n' drop your logo here, or click to select file`}</p>
														) : (
															<p className='text-gray-600'>{`Drag 'n' drop your logo here, or click to select file`}</p>
														)}
													</p>
												</div>
											</div>
										)}
									</Dropzone>
								)}
							/>
							<FormDescription>You must upload an image that is 400 * 400</FormDescription>
						</InnerRowWrap>
					</RowWrap>

					<Button type='submit' disabled={isPending}>
						{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						Create Store
					</Button>
				</form>
			</Form>
		</div>
	);
};

const RowWrap: FC<{children: ReactNode}> = ({children}) => {
	return <div className='flex flex-wrap sm:flex-rows'>{children}</div>;
};

const InnerRowWrap: FC<{children: ReactNode}> = ({children}) => {
	return (
		<div className='w-full sm:w-1/2'>
			<div className='mx-5'>{children}</div>
		</div>
	);
};

export default AddStore;
