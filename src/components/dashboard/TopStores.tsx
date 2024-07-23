'use client';
import {TopStore} from '@/models/store';
import currencyFormat from '@/utils/currency';
import {FC} from 'react';

const TopStores: FC<{topStores: TopStore[]}> = ({topStores}) => {
	return (
		<div className='grid gap-3'>
			<div className='font-semibold'>Top Stores</div>
			<ul className='grid gap-3'>
				{topStores.map((item, index) => (
					<li className='flex items-center justify-between' key={index}>
						<span className='text-muted-foreground'>{item.displayName}</span>
						<span>{currencyFormat.format(item.amount)}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TopStores;
