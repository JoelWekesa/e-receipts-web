/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BuX3lKTL6TV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import {FC} from 'react';
import {H1} from '@/components/titles';

interface Props {
	teamId: string;
}

const AcceptComponent: FC<Props> = ({teamId}) => {
	return (
		<div className='flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-md text-center'>
				<CircleCheckIcon className='mx-auto h-12 w-12 text-green-500' />
				<H1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>Confirmation Successful</H1>
				<p className='mt-4 text-muted-foreground'>Congratulations! You have been added to the team.</p>
				<div className='mt-6'>
					<Link
						href={`/teams/${teamId}`}
						className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
						prefetch={false}>
						Go to team
					</Link>
				</div>
			</div>
		</div>
	);
};

function CircleCheckIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<circle cx='12' cy='12' r='10' />
			<path d='m9 12 2 2 4-4' />
		</svg>
	);
}

export default AcceptComponent;
