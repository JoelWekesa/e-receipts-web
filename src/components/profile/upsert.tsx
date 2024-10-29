'use client';

import {Profile} from '@/models/profile/user-profile';
import useUpdateProfile from '@/services/profile/update-profile';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2, Save} from 'lucide-react';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {FC} from 'react';
import Dropzone from 'react-dropzone';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Button} from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5.0MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const phoneRegex = /^(07|01)\d{8}$/;

const validationSchema = z.object({
	phone: z
		.string()
		.regex(phoneRegex, {
			message: 'Invalid phone number',
		})
		.nullable()
		.optional(),

	address: z.string().nullable(),

	dp: z
		.instanceof(File, {message: 'File is required'})
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE;
		}, 'File size must be less than 3MB')
		.refine((file) => {
			return ACCEPTED_FILE_TYPES.includes(file.type);
		}, 'File must be an image')
		.optional(),
});

const ProfileUpsert: FC<{profile: Profile; toggleOpen: () => void}> = ({profile, toggleOpen}) => {
	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const form = useForm<z.infer<typeof validationSchema>>({
		defaultValues: {
			phone: profile?.phone,
			address: profile?.address,
			dp: undefined,
		},

		resolver: zodResolver(validationSchema),
	});

	const successFn = () => {
		toggleOpen();
	};

	const {mutate: update, isPending} = useUpdateProfile({successFn});

	const handleSubmit = async (data: z.infer<typeof validationSchema>) => {
		update({
			data: {
				phone: data?.phone || '',
				address: data?.address || '',
				dp: data?.dp,
			},

			token,
		});
	};

	return (
		<Form {...form}>
			<form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='justify-start'>
					<FormField
						name='address'
						render={({field}) => (
							<FormItem>
								<FormLabel className='justify-start items-start'>City</FormLabel>
								<FormControl>
									<Input id='address' placeholder='Roysambu' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					render={({field}) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Phone number' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name='phone'
				/>
				<FormField
					control={form.control}
					name='dp'
					render={() => (
						<Dropzone
							accept={{
								'': ['.png', '.jpg', '.jpeg'],
							}}
							multiple={true}
							maxSize={3000000}
							onDropAccepted={(items) => form.setValue('dp', items[0])}>
							{({getRootProps, getInputProps}) => (
								<div className='w-full flex justify-center items-center'>
									<div
										{...getRootProps()}
										className='w-full h-full border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg p-4 flex flex-col '>
										<input {...getInputProps()} />
										{profile?.dp && !form?.getValues('dp') ? (
											<div className='flex flex-initial justify-items-start flex-row gap-5'>
												<Image
													src={profile?.dp}
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
														src={form?.getValues('dp') ? URL.createObjectURL(form.getValues('dp') as File) : ''}
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
				<div className='flex justify-end gap-4'>
					<Button disabled={isPending} variant='destructive'>
						Cancel
					</Button>
					<Button type='submit' disabled={isPending}>
						{isPending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Save className='h-4 w-4 mr-2 ' />}
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default ProfileUpsert;
