'use client';
import {TopStore} from '@/models/store';
import useTopStores from '@/services/stores/top';
import currencyFormat from '@/utils/currency';
import {FC} from 'react';

const TopStores: FC<{topStores: TopStore[]}> = ({topStores}) => {
	const {data} = useTopStores({topStores});

	if (data.length === 0) return <></>;

	return (
		<div className='grid gap-3'>
			<div className='font-semibold'>Top Stores</div>
			<ul className='grid gap-3'>
				{data.map((item, index) => (
					<li className='flex items-center justify-between' key={index}>
						<span className='text-muted-foreground'>{item.name}</span>
						<span>{currencyFormat.format(item.amount)}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TopStores;
