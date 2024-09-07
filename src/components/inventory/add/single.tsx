'use client';
import addImagesAtom, {thumbnailAtom} from '@/atoms/inventory/addimage';
import Required from '@/components/shared/required';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from '@/components/ui/command';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils';
import {Category} from '@/models/inventory/category';
import {positiveNumberRegex, pricePAttern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAtom} from 'jotai';
import {Check, ChevronsUpDown} from 'lucide-react';
import {FC, useEffect, useMemo} from 'react';
import Dropzone from 'react-dropzone';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import ProductHeader from './productheader';
import useAddSimpleProduct from '@/services/inventory/products/add-single';
import Image from 'next/image';
import {DeleteDropDown} from './images/drop';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1.8; // 1.8MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const formSchema = z.object({
	name: z.string({required_error: 'Please enter a product name'}),
	description: z.string(),
	categoryId: z.string({
		required_error: 'Please select a category',
	}),

	thumbnail: z
		.instanceof(File, {message: 'Thumbnail is required'})
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE;
		}, 'File size must be less than 3MB')
		.refine((file) => {
			return ACCEPTED_FILE_TYPES.includes(file.type);
		}, 'File must be an image'),
	images: z
		.array(
			z
				.instanceof(File, {message: 'File is required'})
				.refine((file) => {
					return !file || file.size <= MAX_UPLOAD_SIZE;
				}, 'File size must be less than 3MB')
				.refine((file) => {
					return ACCEPTED_FILE_TYPES.includes(file.type);
				}, 'File must be an image')
		)
		.optional(),

	price: z.string().refine(() => pricePAttern),

	quantity: z.string().refine(() => positiveNumberRegex, {
		message: 'Quantity must be a positive number',
	}),

	discount: z.string().refine(() => positiveNumberRegex, {
		message: 'Discount must be a positive number',
	}),
});

const AddSingleProductComponent: FC<{categories: Category[]; storeId: string; token: string}> = ({
	categories,
	storeId,
	token,
}) => {
	const fCategories = useMemo(
		() =>
			categories.map((category) => ({
				value: category.id,
				label: category.name,
			})),
		[categories]
	);

	const onDrop = (acceptedFiles: File[]) => {
		setImages(acceptedFiles);
		form.setValue('images', acceptedFiles);
	};

	const onDropThumbnail = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			form.setValue('thumbnail', acceptedFiles[0]);
			setThumbnail(acceptedFiles[0]);
		}
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			categoryId: '',
			name: '',
			description: '',
			images: [],
			thumbnail: undefined,
			price: '',
			quantity: '',
			discount: '',
		},

		mode: 'onChange',
	});

	const [images, setImages] = useAtom(addImagesAtom);

	const [thumbnail, setThumbnail] = useAtom(thumbnailAtom);

	console.log({
		images,
		thumbnail,
	});

	const handleSuccess = () => {
		form.reset();
		setImages([]);
		setThumbnail(null);
	};

	useEffect(() => {
		setImages([]);
		setThumbnail(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {mutate: add, isPending} = useAddSimpleProduct(handleSuccess);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		add({
			data: {
				...data,
				storeId,
				files: images,
				thumbnail: thumbnail as File,
			},
			token,
		});
	};

	const onDelete = () => {
		setThumbnail(null);
		form.setValue('thumbnail', undefined as unknown as File);
	};

	const onDeleteIndex = (index: number) => {
		const newImages = images.filter((_, i) => i !== index);
		setImages(newImages);
		form.setValue('images', newImages);
	};

	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className='gap-4'>
					<ProductHeader isPending={isPending} title='Add Product' />
					<Card x-chunk='dashboard-07-chunk-0'>
						<CardHeader>
							<CardTitle>Product Details</CardTitle>
							<CardDescription>Add a new product to your store</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='grid gap-6'>
								<div className='grid gap-3'>
									<FormField
										name='name'
										control={form.control}
										rules={{
											required: true,
										}}
										render={({field}) => (
											<FormItem>
												<FormLabel>Product Name</FormLabel>
												<FormControl>
													<Input id='name' placeholder='Product Name' {...field} required />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-3'>
									<FormField
										name='description'
										control={form.control}
										render={({field}) => (
											<FormItem>
												<FormLabel>Product Description</FormLabel>
												<FormControl>
													<Textarea id='description' placeholder='Product Description' {...field} rows={5} />
												</FormControl>
												<FormDescription>
													Give your product a short and clear description. 120-160 characters is the recommended length for search
													engines.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-3'>
									<FormField
										control={form.control}
										name='categoryId'
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
																{field.value
																	? fCategories.find((category) => category.value === field.value)?.label
																	: 'Select category'}
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
																			form.setValue('categoryId', category.value);
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
								</div>
								<div className='grid gap-3'>
									<FormField
										name='quantity'
										control={form.control}
										rules={{
											required: true,
										}}
										render={({field}) => (
											<FormItem>
												<FormLabel>Product Quantity</FormLabel>
												<FormControl>
													<Input id='quantity' placeholder='Product Quantity' {...field} required />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-3'>
									<FormField
										name='price'
										control={form.control}
										rules={{
											required: true,
										}}
										render={({field}) => (
											<FormItem>
												<FormLabel>Product Price</FormLabel>
												<FormControl>
													<Input id='price' placeholder='Product Price' {...field} required />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-3'>
									<FormField
										name='discount'
										control={form.control}
										rules={{
											required: true,
										}}
										render={({field}) => (
											<FormItem>
												<FormLabel>Product Discount</FormLabel>
												<FormControl>
													<Input id='discount' placeholder='Product Discount' {...field} required />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='grid gap-3'>
									<FormField
										control={form.control}
										name='thumbnail'
										render={() => (
											<FormItem>
												<FormLabel>
													Product Thumbnail <Required />
												</FormLabel>
												<FormControl>
													<Dropzone
														accept={{
															'image/*': ['.png', '.jpg', '.jpeg'],
														}}
														multiple={false}
														maxFiles={1}
														maxSize={5000000}
														onDropAccepted={(items) => onDropThumbnail(items)}>
														{({getRootProps, getInputProps}) => (
															<div className='w-full flex justify-center items-center'>
																<div
																	{...getRootProps()}
																	className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col '>
																	<input {...getInputProps()} />

																	{form?.getValues('thumbnail') ? (
																		<div className='flex flex-initial justify-items-start flex-row gap-5'>
																			<div className='flex flex-col justify-center items-center'>
																				<p>{`Drag 'n' drop your image here, or click to select file`}</p>
																			</div>
																		</div>
																	) : !!form?.formState?.errors?.thumbnail?.message ? (
																		<div className='justify-center items-center'>
																			<p className='text-red-600 text-center'>{`Drag 'n' drop your image here, or click to select file`}</p>
																		</div>
																	) : (
																		<div className='justify-center items-center'>
																			<p className='text-center'>{`Drag 'n' drop your image here, or click to select file`}</p>
																		</div>
																	)}
																</div>
															</div>
														)}
													</Dropzone>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{thumbnail && (
										<div className='flex flex-row justify-between items-center rounded'>
											<div className='flex flex-row gap-2'>
												<Image
													alt='Product image'
													className='object-contain object-center p-2'
													height='84'
													src={URL.createObjectURL(thumbnail)}
													width='84'
												/>

												<p className='flex items-center text-muted-foreground'>{thumbnail.name}</p>
											</div>
											<DeleteDropDown onDelete={onDelete} />
										</div>
									)}
								</div>

								<div className='grid gap-3'>
									<FormField
										control={form.control}
										name='images'
										render={() => (
											<FormItem>
												<FormLabel>
													Product Media <span className='text text-muted-foreground'>(Max 6)</span> <Required />
												</FormLabel>
												<FormControl>
													<Dropzone
														accept={{
															'': ['.png', '.jpg', '.jpeg'],
														}}
														multiple={true}
														maxFiles={6}
														maxSize={5000000}
														useFsAccessApi={false}
														onDropAccepted={(items) => onDrop(items)}>
														{({getRootProps, getInputProps}) => (
															<div className='w-full flex justify-center items-center'>
																<div
																	{...getRootProps()}
																	className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col '>
																	<input {...getInputProps()} />

																	{form?.getValues('images') ? (
																		<div className='flex flex-initial justify-items-start flex-row gap-5'>
																			<div className='flex flex-col justify-center items-center'>
																				<p>{`Drag 'n' drop your images here, or click to select files`}</p>
																			</div>
																		</div>
																	) : !!form?.formState?.errors?.images?.message ? (
																		<div className='justify-center items-center'>
																			<p className='text-red-600 text-center'>{`Drag 'n' drop your images here, or click to select files`}</p>
																		</div>
																	) : (
																		<div className='justify-center items-center'>
																			<p className='text-center'>{`Drag 'n' drop your images here, or click to select files`}</p>
																		</div>
																	)}
																</div>
															</div>
														)}
													</Dropzone>
												</FormControl>
											</FormItem>
										)}
									/>
									{images.map((image, index) => (
										<div className='flex flex-row justify-between items-center rounded' key={index}>
											<div className='flex flex-row gap-2'>
												<Image
													alt='Product image'
													className='object-contain object-center p-2'
													height='84'
													src={URL.createObjectURL(image)}
													width='84'
												/>
												<p className='flex items-center text-muted-foreground'>{image.name}</p>
											</div>

											<DeleteDropDown onDelete={() => onDeleteIndex(index)} />
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
};

export default AddSingleProductComponent;
