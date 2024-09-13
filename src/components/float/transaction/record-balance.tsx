'use client';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import useRecordTransaction from '@/services/float/record-transaction';
import {positiveNumberRegex} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import Image from 'next/image';
import React, {FC} from 'react';
import Dropzone from 'react-dropzone';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const formSchema = z.object({
	amount: z.string().refine((value) => positiveNumberRegex.test(value), {
		message: 'Amount must be a positive number',
	}),

	image: z
		.instanceof(File, {message: 'File is required'})
		.refine((file) => {
			if (file) {
				return file.size <= MAX_UPLOAD_SIZE;
			} else {
				return true;
			}
		}, 'File size must be less than 5MB')
		.refine((file) => {
			if (file) {
				return ACCEPTED_FILE_TYPES.includes(file.type);
			}
		}, 'File must be an image'),
});

interface Props {
	token: string;
	floatId: string;
}

const RecordFloatBalance: FC<Props> = ({token, floatId}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: '',
		},
	});

	const successFn = () => {
		form.reset();
	};

	const {mutate, isPending} = useRecordTransaction(successFn);

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		mutate({
			...data,
			evidence: data.image,
			token,
			floatId,
		});
	};

	return (
		<div className='flex w-full justify-center'>
			<div className='w-full md:w-3/4 justify-center'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className='grid gap-4'>
						<FormField
							rules={{
								required: 'Amount is required',
							}}
							render={({field}) => (
								<FormItem>
									<FormLabel htmlFor='amount'>Amount</FormLabel>
									<FormControl>
										<Input {...field} placeholder='Enter float balance' />
									</FormControl>
									<FormMessage>{form.formState.errors.amount?.message}</FormMessage>
								</FormItem>
							)}
							name='amount'
						/>

						<FormField
							control={form.control}
							name='image'
							render={() => (
								<Dropzone
									accept={{
										'image/*': ['.png', '.jpg', '.jpeg'],
									}}
									multiple={true}
									maxSize={1024 * 1024 * 5}
									onDropAccepted={(items) => form.setValue('image', items[0])}>
									{({getRootProps, getInputProps}) => (
										<div className='w-full flex justify-center items-center'>
											<div
												{...getRootProps()}
												className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col '>
												<input {...getInputProps()} />

												{form?.getValues('image') ? (
													<div className='flex flex-initial justify-items-start flex-row gap-5'>
														<Image
															src={URL.createObjectURL(form?.getValues('image')!)}
															width={100}
															height={100}
															alt='store'
															style={{
																borderRadius: '15%',
															}}
														/>
														<div className='flex flex-col justify-center items-center'>
															<p>{`Drag 'n' drop your photo here, or click to select photo`}</p>
														</div>
													</div>
												) : !!form?.formState?.errors?.image?.message ? (
													<div className='justify-center items-center'>
														<p className='text-red-600 text-center'>{`Drag 'n' drop your logo here, or click to select file`}</p>
													</div>
												) : (
													<div className='justify-center items-center'>
														<p className='text-center'>{`Drag 'n' drop your photo here, or click to select photo`}</p>
													</div>
												)}
											</div>
										</div>
									)}
								</Dropzone>
							)}
						/>

						<Button type='submit' disabled={isPending}>
							{isPending && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}Submit
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default RecordFloatBalance;
