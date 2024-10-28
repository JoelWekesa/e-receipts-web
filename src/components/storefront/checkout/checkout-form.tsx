'use client';
import Required from '@/components/shared/required';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Shipping} from '@/models/shipping/shipping';
import useAddShipping from '@/services/shipping/add';
import {phoneNumberPattern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2, Truck} from 'lucide-react';
import {FC, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useLoadScript} from '@react-google-maps/api';

interface Props {
	shipping: Shipping | null;
	token: string;
}

const formSchema = z.object({
	phone: z.string().refine((value) => phoneNumberPattern.test(value), {
		message: 'Invalid phone number',
	}),

	email: z.string().optional(),
	firstName: z.string().min(2).max(255),
	lastName: z.string().min(2).max(255),
	address: z.string().min(2).max(255),
	city: z.string().min(2).max(255),
});

const CheckOutForm: FC<Props> = ({shipping, token}) => {
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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: shipping?.phone || '',
			email: shipping?.email || undefined,
			firstName: shipping?.firstName || '',
			lastName: shipping?.lastName || '',
			address: shipping?.address || '',
			city: shipping?.city || '',
		},
	});

	const {mutate: add, isPending} = useAddShipping();

	const handleSubmit = (data: z.infer<typeof formSchema>) => {
		const full_place = `${selectedPlace?.name}` + `, ${selectedPlace?.formatted_address}`;
		add({
			shipping: {
				phone: data.phone,
				email: data.email?.length ? data.email : undefined,
				firstName: data.firstName,
				lastName: data.lastName,
				address: full_place ? full_place : data.address,
				city: full_place ? full_place : data.address,
			},
			token,
		});
	};

	return (
		<div className='flex flex-col gap-2 w-full'>
			<Form {...form}>
				<form className='flex flex-1 flex-col gap-2 p-2' onSubmit={form.handleSubmit(handleSubmit)}>
					<section>
						<p className='text-2xl font-semibold'>Contact</p>
						<div className='flex flex-col py-2 gap-5 w-full'>
							<FormField
								name='phone'
								render={({field}) => (
									<FormItem>
										<FormLabel>
											Phone Number <Required />
										</FormLabel>
										<FormControl>
											<Input id='phone' placeholder='0712345678' {...field} required className='flex min-w-full' lg />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='email'
								render={({field}) => (
									<FormItem>
										<FormLabel>Email Address (optional)</FormLabel>
										<FormControl>
											<Input id='email' placeholder='johndoe@email.com' {...field} className='flex min-w-full' lg />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>
					<section>
						<p className='text-2xl font-semibold'>Shipping Address</p>
						<div className='flex flex-col py-2 gap-5 w-full'>
							<div className='grid md:grid-cols-2 grid-cols-1 w-full gap-3'>
								<FormField
									name='firstName'
									render={({field}) => (
										<FormItem>
											<FormLabel>
												First Name <Required />
											</FormLabel>
											<FormControl>
												<Input id='firstName' placeholder='John' {...field} className='flex min-w-full' lg required />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									name='lastName'
									render={({field}) => (
										<FormItem>
											<FormLabel>
												Last Name <Required />
											</FormLabel>
											<FormControl>
												<Input id='lastName' placeholder='Doe' {...field} className='flex min-w-full' lg required />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								name='address'
								render={({field: {ref, ...rest}}) => (
									<FormItem>
										<FormLabel>
											Address <Required />
										</FormLabel>
										<FormControl>
											<Input
												id='address'
												placeholder='Roysambu'
												ref={inputRef}
												{...rest}
												type='search'
												className='flex min-w-full'
												lg
												required
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</section>
					<Button type='submit'>
						{isPending ? <Loader2 className='w-6 h-6 mr-2 animate-spin' /> : <Truck className='w-6 h-6 mr-2' />} Confirm
						Shipping
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CheckOutForm;
