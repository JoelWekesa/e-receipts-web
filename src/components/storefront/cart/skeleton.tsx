import {Skeleton} from '@/components/ui/skeleton';
import React from 'react';

const CartItemSkeleton = () => {
	return (
		<div className='relative flex w-full flex-row justify-between px-1 py-4'>
			<Skeleton className='relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800' />

			<div className='flex h-16 flex-col justify-between items-start'>
				<Skeleton className='w-48 h-4' />
				<div className='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
					<Skeleton className='w-32 h-4' />
				</div>
			</div>
		</div>
	);
};

export default CartItemSkeleton;
