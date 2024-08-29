'use client';
import {Store} from '@/models/store';
import useStoreById from '@/services/stores/getbyid';
import useUpdateStore from '@/services/stores/update';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {FC, ReactNode} from 'react';
import Dropzone from 'react-dropzone';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';

const UpdateStoreComponent = ({id, initialData, token}: {id: string; initialData: Store; token: string}) => {
	const {data} = useStoreById({id, store: initialData});

	const router = useRouter();

	const MAX_UPLOAD_SIZE = 1024 * 1024 * 1.8; // 1.8MB
	const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
	const regex = /^(07|01)\d{8}$/;
	const nameRegex = /^[a-zA-Z][a-zA-Z0-9_ .]{2,15}$/;
	const formSchema = z.object({
		name: z.string().min(3, {message: 'Name is required'}).regex(nameRegex, {message: 'Invalid name'}),
		address: z.string().min(1, {message: 'Address is required'}),
		phone: z.string().min(1, {message: 'Phone is required'}).regex(regex, {message: 'Invalid phone number'}),
		email: z.string().min(1, {message: 'Email is required'}).email({message: 'Invalid email'}),
		logo: z
			.optional(z.instanceof(File))
			.refine((file) => {
				if (file) {
					return !file || file.size <= MAX_UPLOAD_SIZE;
				}

				return true;
			}, 'File size must be less than 3MB')
			.refine((file) => {
				if (file) {
					return ACCEPTED_FILE_TYPES.includes(file.type);
				}

				return true;
			}, 'File must be an image'),

		pin_no: z.optional(z.string()),
		vat_reg_no: z.optional(z.string()),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data?.displayName,
			address: data?.address,
			phone: data?.phone,
			email: data?.email,
			pin_no: data?.pin_no || '',
			vat_reg_no: data?.vat_reg_no || '',
			logo: undefined,
		},
	});

	const successFn = () => {
		form.reset();
		router.push('/stores/all');
	};

	const {mutate, isPending} = useUpdateStore(successFn);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({
			data: {
				...data,
				id,
			},
			token,
		});
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
											<div className='px-2 mx-2'>
												<ol>
													<li>Must be between 3 and 15 characters</li>
													<li>Must start with a letter</li>
													<li>Can contain letters, numbers, underscores and periods</li>
												</ol>
											</div>
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
													className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col '>
													<input {...getInputProps()} />
													{data?.logo && !form?.getValues('logo') ? (
														<div className='flex flex-initial justify-items-start flex-row gap-5'>
															<Image
																src={data?.logo || ''}
																width={100}
																height={100}
																alt='store'
																style={{
																	borderRadius: '15%',
																}}
															/>
															<div className='flex flex-col justify-center items-center'>
																<p>{`Drag 'n' drop your logo here, or click to select file`}</p>
															</div>
														</div>
													) : (
														<div className='justify-center items-center'>
															<div className='flex flex-initial justify-items-start flex-row gap-5'>
																<Image
																	src={form?.getValues('logo') ? URL.createObjectURL(form.getValues('logo') as File) : ''}
																	width={100}
																	height={100}
																	alt='store'
																	style={{
																		borderRadius: '15%',
																	}}
																/>
																<div className='flex flex-col justify-center items-center'>
																	<p>{`Drag 'n' drop your logo here, or click to select file`}</p>
																</div>
															</div>
														</div>
													)}
												</div>
											</div>
										)}
									</Dropzone>
								)}
							/>
							<FormDescription>Upload new image</FormDescription>
						</InnerRowWrap>
					</RowWrap>

					<Button type='submit' disabled={isPending}>
						{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
						Update Store
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

export default UpdateStoreComponent;
