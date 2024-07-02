'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import useRequestReset from '@/services/auth/request';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^254[0-9]{9}$/;

// Combined regex using the OR (|) operator
const combinedRegex = new RegExp(emailRegex.source + '|' + phoneRegex.source);

const validationSchema = z.object({
	identity: z.string().refine(() => combinedRegex, {
		message: 'Please enter a valid email or phone number',
	}),
});

const RequestReset = () => {
	const form = useForm<z.infer<typeof validationSchema>>({
		defaultValues: {
			identity: '',
		},

		resolver: zodResolver(validationSchema),
	});

	const router = useRouter();

	const successFn = () => {
		router.push('/auth/reset');
	};

	const {mutate: request, isPending} = useRequestReset(successFn);

	const handleRequest = (data: z.infer<typeof validationSchema>) => {
		request(data);
	};
	return (
		<Card className='mx-auto p-4 max-w-sm md:max-w-lg'>
			<CardHeader>
				<CardTitle className='text-xl'>Reset Password</CardTitle>
				<CardDescription>Enter your email or phone number to reset your password</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='grid gap-4' onSubmit={form.handleSubmit(handleRequest)}>
						<FormField
							control={form.control}
							name='identity'
							render={({field}) => (
								<FormItem>
									<FormLabel>Email or Phone</FormLabel>
									<FormControl>
										<Input placeholder='m@example.com or 0712345678' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isPending}>
							<div className='flex flex-row items-center justify-center'>
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								<span>Reset Password</span>
							</div>
						</Button>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Remembered Password?{' '}
					<Link href='/auth/login' className='underline'>
						Sign in
					</Link>
				</div>

				<div className='mt-4 text-center text-sm'>
					I have a code{' '}
					<Link href='/auth/reset' className='underline'>
						Reset
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};

export default RequestReset;
