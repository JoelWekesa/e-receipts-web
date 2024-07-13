import editImagesAtom from '@/atoms/inventory/images';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Inventory} from '@/models/inventory/inventory';
import {useAtom} from 'jotai';
import {FC, useEffect} from 'react';
import Dropzone from 'react-dropzone';
import {UseFormReturn} from 'react-hook-form';

export const EditProductComponent: FC<{
	form: UseFormReturn<
		{name: string; description?: string | undefined; category: string; images?: File[]},
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
							control={form.control}
							name='images'
							render={() => (
								<Dropzone
									accept={{
										'image/*': ['.png'],
									}}
									multiple={true}
									maxFiles={9 - ((images?.current?.length || 0) + (images?.new?.length || 0))}
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
							)}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default EditProductComponent;
