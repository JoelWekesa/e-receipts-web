'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import useResetPasswordProfile from '@/services/profile/reset-pass';
import {passwordPattern} from '@/utils/regex';
import {zodResolver} from '@hookform/resolvers/zod';
import {Loader2} from 'lucide-react';
import {FC} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

const validationSchema = z
	.object({
		password: z.string().regex(passwordPattern, {
			message: 'Please enter a valid password',
		}),

		confirm: z.string().regex(passwordPattern, {
			message: 'Please enter a valid password',
		}),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm'],
	});

const ResetComponent: FC<{token: string}> = ({token}) => {
	const form = useForm<z.infer<typeof validationSchema>>({
		defaultValues: {
			password: '',
			confirm: '',
		},

		resolver: zodResolver(validationSchema),
	});

	const successFn = () => {
		form.reset();
	};

	const {mutate: reset, isPending} = useResetPasswordProfile(successFn);

	const handleRequest = (data: z.infer<typeof validationSchema>) => {
		reset({...data, token});
	};

	return (
		<Card x-chunk='dashboard-04-chunk-1'>
			<CardHeader>
				<CardTitle className='text-xl'>Reset Password</CardTitle>
				<CardDescription>Enter your code and new password to reset your password</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form className='grid gap-4' onSubmit={form.handleSubmit(handleRequest)}>
						<FormField
							control={form.control}
							name='password'
							render={({field}) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder='Enter new password' {...field} type='password' />
									</FormControl>
									<FormMessage />
									<FormDescription>
										<ol>
											<li>Minimum Length: The password must be at least 8 characters long.</li>
											<li>Uppercase Letter: The password must contain at least one uppercase letter (A-Z).</li>
											<li>Lowercase Letter: The password must contain at least one lowercase letter (a-z).</li>
											<li>Digit: The password must contain at least one digit (0-9).</li>
											<li>Special Character: The password must contain at least one special character from the set @$!%*?&.</li>
										</ol>
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='confirm'
							render={({field}) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input placeholder='Enter new password again' {...field} type='password' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isPending}>
							<div className='flex flex-row items-center justify-center'>
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								<span>Save New Password</span>
							</div>
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default ResetComponent;
