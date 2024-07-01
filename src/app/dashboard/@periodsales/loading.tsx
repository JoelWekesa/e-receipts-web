import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
	return (
		<div className='grid auto-rows-max items-start md:gap-8 lg:col-span-2'>
			<div className='flex flex-col'>
				<div className='space-y-4 pt-6'>
					<div className='pt-6 flex flex-col h-screen'>
						<div className='h-2/3 border rounded-xl p-1'>
							<Skeleton className='h-full w-full' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
