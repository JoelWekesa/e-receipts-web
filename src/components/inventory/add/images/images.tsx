import addImagesAtom from '@/atoms/inventory/addimage';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {useAtom} from 'jotai';
import Image from 'next/image';
import Dropzone from 'react-dropzone';
import {useFormContext} from 'react-hook-form';
import {DeleteDropDown} from './drop';
import Required from '@/components/shared/required';

const ProductImages = () => {
	const [images, setImages] = useAtom(addImagesAtom);

	const form = useFormContext();

	const onDrop = (acceptedFiles: File[]) => {
		setImages(acceptedFiles);
		console.log(acceptedFiles);
		form.setValue('images', acceptedFiles);
	};

	const onDelete = (index: number) => {
		const newImages = images.filter((_, i) => i !== index);
		setImages(newImages);
		form.setValue('images', newImages);
	};

	console.log(form.formState.errors);

	return (
		<div className='flex flex-col gap-4 py-2'>
			<Form {...form}>
				<form>
					<FormField
						control={form.control}
						name='images'
						render={() => (
							<FormItem>
								<FormLabel>
									Product Medias <span className='text text-muted-foreground'>(Max 3)</span> <Required />
								</FormLabel>
								<FormControl>
									<Dropzone
										accept={{
											'': ['.png', '.jpg', '.jpeg'],
										}}
										multiple={true}
										maxFiles={3}
										maxSize={50000000}
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
				</form>
			</Form>
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

					<DeleteDropDown onDelete={() => onDelete(index)} />
				</div>
			))}
		</div>
	);
};

export default ProductImages;
