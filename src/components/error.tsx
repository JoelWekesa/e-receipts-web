'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ygS8ZXxz4H0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import {H1} from './titles';

export default function CustomError({error}: {error: Error & {digest?: string}; reset: () => void}) {
	return (
		<div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-md text-center'>
				<div className='mx-auto h-12 w-12 text-primary' />
				<H1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>{error?.name}</H1>
				<p className='mt-4 text-muted-foreground'>{error?.message || 'Something went wrong'}</p>
				<div className='mt-6'>
					<Link
						href='/'
						className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
						prefetch={false}>
						Go to Homepage
					</Link>
				</div>
			</div>
		</div>
	);
}
