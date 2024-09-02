'use client';
import {ClientOrder} from '@/models/orders/order-client';
import {FC} from 'react';
import BackButton from './button';
import CustomerCard from './customercard';
import IntroCard from './introcard';
import SummaryCard from './summary';
import PaymentCard from './payment';
import useOrder from '@/services/orders/get-order';
import {OrderStatus} from '@/models/orders/orders-store';
import PaidCard from './payment/paid';

interface OrderProps {
	order: ClientOrder;
	teamId?: string;
}

const OrderComponent: FC<OrderProps> = ({order, teamId}) => {
	const {data} = useOrder({id: order.id, order});

	return (
		<div className='flex flex-1 flex-col gap-2'>
			<BackButton storeId={data.storeId} teamId={ teamId} />
			<IntroCard order={data} />
			<CustomerCard order={data} />
			<SummaryCard order={data} />
			{data.status === OrderStatus.COMPLETED && data.Receipt.length > 0 && <PaidCard order={data} />}
			{data.status !== OrderStatus.COMPLETED && <PaymentCard order={data} />}
		</div>
	);
};

export default OrderComponent;
