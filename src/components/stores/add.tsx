'use client';
import useAddStore from '@/services/stores/add';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {FC, ReactNode, useEffect, useRef, useState} from 'react';
import Dropzone from 'react-dropzone';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import {useLoadScript} from '@react-google-maps/api';

const AddStore: FC<{token: string}> = ({token}) => {
	const {isLoaded, loadError} = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
		libraries: ['places'],
	});

	const inputRef = useRef(null);

	const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

	const handlePlaceChanged = async (address: google.maps.places.Autocomplete) => {
		if (!isLoaded) return;
		const place = address.getPlace();

		if (!place || !place.geometry) {
			setSelectedPlace(null);
			return;
		}

		const full_place = `${place?.name}` + `, ${place?.formatted_address}`;

		form.setValue('address', full_place);
	};

	useEffect(() => {
		if (!isLoaded || loadError) return;

		const options = {
			componentRestrictions: {country: 'ke'},
			fields: ['address_components', 'geometry', 'name', 'formatted_address'],
		};

		const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, options);
		autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoaded, loadError]);

	const router = useRouter();
	const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 1.8MB
	const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
	const regex = /^(07|01)\d{8}$/;
	const nameRgex = /^[a-zA-Z][a-zA-Z0-9_ .]{2,15}$/;
	const formSchema = z.object({
		name: z.string().min(3, {message: 'Name is required'}).regex(nameRgex, {message: 'Invalid name'}),
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
		router.push('/stores/all');
	};

	const {mutate, isPending} = useAddStore(successFn);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const full_place = `${selectedPlace?.name}` + `, ${selectedPlace?.formatted_address}`;
		mutate({
			data: {
				...data,
				address: selectedPlace?.name ? full_place : data.address,
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
								render={({field: {ref, ...rest}}) => (
									<FormItem>
										<FormLabel>Store Address</FormLabel>
										<FormControl>
											<Input placeholder='Shop Address' ref={inputRef} {...rest} className='w:full' type='search' />
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
											'': ['.png', '.jpg', '.jpeg'],
										}}
										useFsAccessApi={false}
										multiple={false}
										maxSize={3000000}
										onDropAccepted={(items) => form.setValue('logo', items[0])}>
										{({getRootProps, getInputProps}) => (
											<div className='w-full flex justify-center items-center'>
												<div
													{...getRootProps()}
													className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col '>
													<input {...getInputProps()} />

													{form?.getValues('logo') ? (
														<div className='flex flex-initial justify-items-start flex-row gap-5'>
															<Image
																src={URL.createObjectURL(form?.getValues('logo'))}
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
													) : !!form?.formState?.errors?.logo?.message ? (
														<div className='justify-center items-center'>
															<p className='text-red-600 text-center'>{`Drag 'n' drop your logo here, or click to select file`}</p>
														</div>
													) : (
														<div className='justify-center items-center'>
															<p className='text-center'>{`Drag 'n' drop your logo here, or click to select file`}</p>
														</div>
													)}
												</div>
											</div>
										)}
									</Dropzone>
								)}
							/>
							<FormDescription>Upload a new image</FormDescription>
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
