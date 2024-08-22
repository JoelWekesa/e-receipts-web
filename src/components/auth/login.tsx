'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {emailPattern, passwordPattern, phoneNumberPattern, usernamePattern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';

const formSchema = z.object({
	username: z.string().refine(() => usernamePattern || emailPattern || phoneNumberPattern, {
		message: 'Please enter a valid username, email or phone number',
	}),
	password: z.string().refine(() => passwordPattern, {
		message: 'Please enter a valid password',
	}),
});

export const LoginForm: FC<{path?: string}> = ({path}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const handleSubmit = async (data: z.infer<typeof formSchema>) => {
		await signIn('credentials', {
			username: data.username,
			password: data.password,
			callbackUrl: path || '/',
		});
	};

	return (
		<Card className='mx-auto max-w-sm md:max-w-lg'>
			<CardHeader>
				<CardTitle className='text-2xl text-center'>Login</CardTitle>
				<CardDescription>Enter your email, username, or phone below to login to your account</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='grid gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							name='username'
							control={form.control}
							rules={{required: true}}
							render={({field}) => (
								<FormItem>
									<FormLabel>Username, Email, or Phone</FormLabel>
									<FormControl>
										<Input id='email' placeholder='Email, Username or Phone' {...field} required />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='password'
							control={form.control}
							rules={{required: true}}
							render={({field}) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input id='email' type='password' placeholder='Password' {...field} required />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Login
						</Button>
						<div className='text-center'>OR</div>
					</form>
					<Button
						variant='default'
						className='w-full bg-blue-800 text-white hover:bg-blue-600'
						onClick={() =>
							signIn('google', {
								redirect: true,
								callbackUrl: path || '/',
							})
						}>
						Continue With Google
					</Button>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/auth/register' className='underline'>
						Sign up
					</Link>
				</div>
				<div className='mt-4 text-center text-sm'>
					Forgot your password?{' '}
					<Link href='/auth/request' className='underline'>
						Reset Password
					</Link>
				</div>
			</CardContent>
		</Card>
	);
};
