'use client';
import {AlertTriangle} from 'lucide-react';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ygS8ZXxz4H0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';

export default function NotFoundPage() {
	return (
		<div className='flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-background to-primary/10 px-4 py-12 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-md text-center'>
				<AlertTriangle className='mx-auto h-24 w-24 text-primary animate-pulse' />
				<h1 className='mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>404 - Page Not Found</h1>
				<p className='mt-6 text-xl text-muted-foreground'>Oops! It seems you've ventured into uncharted territory.</p>
				<div className='mt-10'>
					<Link
						href='/'
						className='inline-flex items-center rounded-full bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
						prefetch={false}>
						Return to Safety
					</Link>
				</div>
			</div>
		</div>
	);
}
