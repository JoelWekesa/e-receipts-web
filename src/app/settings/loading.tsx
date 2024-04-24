import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';

const Loader = () => {
	return (
		<div>
			<div className=' border-b'>
				<div className='p-4 flex flex-row gap-2'>
					<Skeleton className='h-8 w-8 rounded-full' />
				</div>
			</div>
			<div className='space-y-4 p-8 pt-6'>
				<div className='p-6 flex flex-col gap-2 h-screen border'>
					{' '}
					{/* <Skeleton className='h-10 w-1/3' /> */}
					<Skeleton className='h-full w-full' />
				</div>
			</div>
		</div>
	);
};

export default Loader;
