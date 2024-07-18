'use client';
import {FC} from 'react';

import {TopCustomers} from '@/models/store';
import useStoreTopCustomers from '@/services/store/top-customers';
import TopCustomersComponent from '../dashboard/TopCustomers';

interface Props {
	topCustomers: TopCustomers[];
	storeId: string;
}

const StoreTopsComponent: FC<Props> = ({topCustomers, storeId}) => {
	const {data: customers} = useStoreTopCustomers({
		storeId,
		customers: topCustomers,
	});

	return (
		<div className='border border-solid p-2 my-2 rounded-lg'>
			<TopCustomersComponent topCustomers={customers} />
		</div>
	);
};

export default StoreTopsComponent;
