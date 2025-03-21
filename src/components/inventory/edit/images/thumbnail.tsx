'use client';
import editImagesAtom from '@/atoms/inventory/images';
import Required from '@/components/shared/required';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Inventory} from '@/models/inventory/inventory';
import {urlStrip} from '@/utils/urlstrip';
import {useAtom} from 'jotai';
import Image from 'next/image';
import {FC} from 'react';
import Dropzone from 'react-dropzone';
import {useFormContext} from 'react-hook-form';

interface Props {
	inventory: Inventory;
}

const Thumbnail: FC<Props> = ({inventory}) => {
	const [images, setImages] = useAtom(editImagesAtom);

	const form = useFormContext();

	const onDropThumbnail = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			form.setValue('thumbnail', acceptedFiles[0]);
			setImages({
				...images,
				thumbnail: acceptedFiles[0],
			});
		}
	};

	return (
		<div className='flex flex-col gap-4'>
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

			{images?.thumbnail ? (
				<div className='flex flex-row justify-between items-center rounded'>
					<div className='flex flex-row gap-2'>
						<Image
							alt='Product image'
							className='object-contain object-center p-2'
							height='84'
							src={URL.createObjectURL(images.thumbnail as File)}
							width='84'
						/>

						<p className='flex items-center text-muted-foreground'>{(images.thumbnail as File).name}</p>
					</div>
					{/* <DeleteDropDown onDelete={onDelete} /> */}
				</div>
			) : (
				<div className='flex flex-row justify-between items-center rounded'>
					<div className='flex flex-row gap-2'>
						<Image
							alt='Product image'
							className='object-contain object-center p-2'
							height='84'
							src={inventory?.thumbnail || ''}
							width='84'
						/>

						<p className='flex items-center text-muted-foreground'>{urlStrip(inventory?.thumbnail || '')}</p>
					</div>
					{/* <DeleteDropDown onDelete={onDelete} /> */}
				</div>
			)}
		</div>
	);
};

export default Thumbnail;
