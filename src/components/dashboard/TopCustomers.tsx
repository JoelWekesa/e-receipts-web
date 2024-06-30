'use client';
import {TopCustomers} from '@/models/store';
import useTopCustomers from '@/services/stores/topcustomers';
import {FC} from 'react';

const TopCustomersComponent: FC<{topCustomers: TopCustomers[]}> = ({topCustomers}) => {
	const {data} = useTopCustomers({topCustomers});

	if (data.length === 0) return <></>;

	return (
		<div className='grid gap-3'>
			<div className='font-semibold'>Top Returning Customers</div>
			<ul className='grid gap-3'>
				{data.map((item, index) => (
					<li className='flex items-center justify-between' key={index}>
						<span className='text-muted-foreground'>{item.name}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TopCustomersComponent;
