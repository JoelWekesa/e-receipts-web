'use client';
import React, {FC} from 'react';
import TopStores from '../TopStores';
import {TopCustomers, TopStore} from '@/models/store';
import {Separator} from '@/components/ui/separator';
import TopCustomersComponent from '../TopCustomers';
import {useTopCustomers, useTopStores} from '@/services/top/top';

const TopsComponent: FC<{topStores: TopStore[]; topCustomers: TopCustomers[]}> = ({topStores, topCustomers}) => {
	const {data: stores} = useTopStores(topStores);
	const {data: customers} = useTopCustomers(topCustomers);

	return (
		<>
			<TopStores topStores={stores} />
			<Separator className='my-2' />
			<TopCustomersComponent topCustomers={customers} />
			<Separator className='my-2' />
		</>
	);
};

export default TopsComponent;
