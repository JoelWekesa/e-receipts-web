/**
 * v0 by Vercel.
 * @see https://v0.dev/t/nZDEIahLEl8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {Skeleton} from '@/components/ui/skeleton';
import {FC} from 'react';

const PageLoader: FC<{component?: boolean}> = ({component}) => {
	return (
		<div className={`flex ${component ? 'h-full' : 'min-h-[100dvh]'} flex-col bg-background`}>
			<div className='container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]'>
					<div className='space-y-4'>
						<Skeleton className='h-12 w-full rounded-md' />
						<Skeleton className='h-8 w-full rounded-md' />
						<Skeleton className='h-8 w-full rounded-md' />
						<Skeleton className='h-8 w-full rounded-md' />
					</div>
					<div className='space-y-4'>
						<Skeleton className='h-12 w-full rounded-md' />
						<Skeleton className='h-32 w-full rounded-md' />
						<Skeleton className='h-12 w-full rounded-md' />
						<Skeleton className='h-12 w-full rounded-md' />
						<Skeleton className='h-12 w-full rounded-md' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageLoader;
