import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';

const Loader = () => {
	return (
		<>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<main className='grid flex-1 items-start sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 '>
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
					<div className='hidden sm:block lg:block'>
						<div className='flex flex-col'>
							<div className='space-y-4 pt-6'>
								<div className='pt-6  pb-6 flex flex-col h-screen'>
									<div className='h-screen border rounded-xl p-1 w-full'>
										<Skeleton className='h-full w-full' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default Loader;
