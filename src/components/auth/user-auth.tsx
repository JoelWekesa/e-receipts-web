'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const validationSchema = z.object({
	email: z.string().email({
		message: 'You must provide a valid email address',
	}),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const { signIn } = useSignIn();

	const form = useForm<z.infer<typeof validationSchema>>({
		resolver: zodResolver(validationSchema),
		defaultValues: {
			email: '',
		},
	});

	const signInWith = (strategy: OAuthStrategy) => {
		return signIn?.authenticateWithRedirect({
			strategy,
			redirectUrl: '/sso-callback',
			redirectUrlComplete: '/',
		});
	};

	function onSubmit(values: z.infer<typeof validationSchema>) {
		signIn?.create({
			identifier: values.email,
		});
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			{/* <Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid gap-2'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='example@email.com' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit'>Sign In with Email</Button>
					</div>
				</form>
			</Form> */}

			<Button
				variant='outline'
				type='button'
				onClick={() => signInWith('oauth_github')}>
				<Icons.gitHub className='mr-2 h-4 w-4' />
				GitHub
			</Button>

			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Or continue with
					</span>
				</div>
			</div>

			<Button
				variant='outline'
				type='button'
				onClick={() => signInWith('oauth_google')}>
				<Icons.google className='mr-2 h-4 w-4' />
				Google
			</Button>
			<Button
				variant='outline'
				type='button'
				onClick={() => signInWith('oauth_facebook')}>
				<Icons.faceBook className='mr-2 h-4 w-4' />
				Facebook
			</Button>
		</div>
	);
}
