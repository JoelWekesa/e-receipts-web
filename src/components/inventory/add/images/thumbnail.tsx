'use client';
import {thumbnailAtom} from '@/atoms/inventory/addimage';
import Required from '@/components/shared/required';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {useAtom} from 'jotai';
import Image from 'next/image';
import Dropzone from 'react-dropzone';
import {useFormContext} from 'react-hook-form';
import {DeleteDropDown} from './drop';

const Thumbnail = () => {
	const [thumbnails, setThumbnail] = useAtom(thumbnailAtom);

	const form = useFormContext();

	const onDropThumbnail = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			form.setValue('thumbnail', acceptedFiles[0]);
			setThumbnail(acceptedFiles[0]);
		}
	};

	const onDelete = () => {
		setThumbnail(null);
		form.setValue('thumbnail', null);
	};

	return (
		<div className='flex flex-col gap-4'>
			<Form {...form}>
				<form className='py-4'>
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
				</form>
			</Form>
			{thumbnails && (
				<div className='flex flex-row justify-between items-center rounded'>
					<div className='flex flex-row gap-2'>
						<Image
							alt='Product image'
							className='object-contain object-center p-2'
							height='84'
							src={URL.createObjectURL(thumbnails)}
							width='84'
						/>

						<p className='flex items-center text-muted-foreground'>{thumbnails.name}</p>
					</div>
					<DeleteDropDown onDelete={onDelete} />
				</div>
			)}
		</div>
	);
};

export default Thumbnail;
