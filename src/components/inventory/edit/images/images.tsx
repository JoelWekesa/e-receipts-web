import editImagesAtom from '@/atoms/inventory/images';
import Required from '@/components/shared/required';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {Inventory} from '@/models/inventory/inventory';
import {urlStrip} from '@/utils/urlstrip';
import {useAtom} from 'jotai';
import Image from 'next/image';
import {FC, useEffect} from 'react';
import Dropzone from 'react-dropzone';
import {useFormContext} from 'react-hook-form';
import {DeleteDropDown} from './drop';

interface Props {
	inventory: Inventory;
}

const ProductImages: FC<Props> = ({inventory}) => {
	const [images, setImages] = useAtom(editImagesAtom);

	const form = useFormContext();

	const onDrop = (acceptedFiles: File[]) => {
		setImages({
			new: acceptedFiles,
		});
		form.setValue('images', acceptedFiles);
	};

	const onDelete = (index: number) => {
		const newImages = images?.new?.filter((_, i) => i !== index);
		setImages({
			new: newImages,
		});
		form.setValue('images', newImages);
	};

	const deleteExistingImage = (index: number) => {
		const newImages = images?.current?.filter((_, i) => i !== index);
		setImages({
			current: newImages,
			removed: [...(images?.removed || []), images?.current ? images.current[index] : ''],
		});
	};

	useEffect(() => {
		setImages({
			...images,
			current: inventory?.images,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inventory]);

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
									Product Media <span className='text text-muted-foreground'>(Max 6)</span> <Required />
								</FormLabel>
								<FormControl>
									<Dropzone
										accept={{
											'': ['.png', '.jpg', '.jpeg'],
										}}
										multiple={true}
										maxFiles={6 - (images?.current?.length || 0)}
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
				</form>
			</Form>
			{images?.new?.map((image, index) => (
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
			{images?.current?.map((image, index) => (
				<div className='flex flex-row justify-between items-center rounded' key={index}>
					<div className='flex flex-row gap-2'>
						<Image alt='Product image' className='object-contain object-center p-2' height='84' src={image} width='84' />
						<p className='flex items-center text-muted-foreground'>{urlStrip(image)}</p>
					</div>

					<DeleteDropDown onDelete={() => deleteExistingImage(index)} />
				</div>
			))}
		</div>
	);
};

export default ProductImages;
