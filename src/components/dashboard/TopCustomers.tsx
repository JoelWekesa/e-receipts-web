'use client';
import {TopCustomers} from '@/models/store';
import {FC} from 'react';

const TopCustomersComponent: FC<{topCustomers: TopCustomers[]}> = ({topCustomers}) => {
	return (
		<div className='grid gap-3'>
			<div className='font-semibold'>Top Returning Customers</div>
			<ul className='grid gap-3'>
				{topCustomers.map((item, index) => (
					<li className='flex items-center justify-between' key={index}>
						<span className='text-muted-foreground'>{item.name}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TopCustomersComponent;
