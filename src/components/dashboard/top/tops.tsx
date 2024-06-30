import React, {FC} from 'react';
import TopStores from '../TopStores';
import {TopCustomers, TopStore} from '@/models/store';
import {Separator} from '@/components/ui/separator';
import TopCustomersComponent from '../TopCustomers';

const TopsComponent: FC<{topStores: TopStore[]; topCustomers: TopCustomers[]}> = ({topStores, topCustomers}) => {
	return (
		<>
			<TopStores topStores={topStores} />
			<Separator className='my-2' />
			<TopCustomersComponent topCustomers={topCustomers} />
			<Separator className='my-2' />
		</>
	);
};

export default TopsComponent;
