import editImagesAtom from '@/atoms/inventory/images';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Inventory} from '@/models/inventory/inventory';
import {useAtom} from 'jotai';
import {FC, useEffect} from 'react';
import Dropzone from 'react-dropzone';
import {UseFormReturn} from 'react-hook-form';

export const EditProductComponent: FC<{
	form: UseFormReturn<
		{name: string; description?: string | undefined; category: string; images?: File[]; thumbnail?: File; price?: string},
		any,
		undefined
	>;

	inventory: Inventory;
}> = ({form, inventory}) => {
	const [images, setImages] = useAtom(editImagesAtom);

	const initiateImages = () => {
		setImages({
			removed: [],
			new: [],
			current: inventory?.images,
			thumbnail: inventory?.thumbnail,
		});
	};

	useEffect(() => {
		initiateImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onDrop = (acceptedFiles: File[]) => {
		setImages({
			...images,
			new: acceptedFiles,
		});
		form.setValue('images', acceptedFiles);
	};

	const onDropThumbnail = (acceptedFiles: File[]) => {
		setImages({
			...images,
			thumbnail: acceptedFiles[0],
		});
		form.setValue('thumbnail', acceptedFiles[0]);
	};

	return (
		<Card x-chunk='dashboard-07-chunk-0'>
			<CardHeader>
				<CardTitle>Product Details</CardTitle>
				<CardDescription>Edit Product</CardDescription>
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
										<Textarea id='description' placeholder='Product Name' {...field} />
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
									<FormDescription>
										{`If your product does not have a fixed price, you can leave this field empty. You can then set the price for each product variant.`}
									</FormDescription>
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
									<FormLabel>Product Thumbnail</FormLabel>
									<FormControl>
										<Dropzone
											accept={{
												'image/*': ['.png'],
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
									<FormDescription>
										{`The thumbnail image is the main visual representation of your product in the storefront. It will provide a quick and appealing preview to attract customers.
										This image is crucial for showcasing your product's features, design, and uniqueness at a glance. Ensure that
										the thumbnail is high-quality and accurately represents the product, as it will play a key role in capturing
										customers' attention and encouraging them to explore further.`}
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-3'>
						<FormField
							control={form.control}
							name='images'
							render={() => (
								<FormItem>
									<FormLabel>
										Product Images
										<span className='text-xs text-gray-400'> (Max 6)</span>
									</FormLabel>
									<FormControl>
										<Dropzone
											accept={{
												'image/*': ['.png'],
											}}
											multiple={true}
											maxFiles={6 - ((images?.current?.length || 0) + (images?.new?.length || 0))}
											maxSize={5000000}
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
									<FormDescription>Detailed product views</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default EditProductComponent;
