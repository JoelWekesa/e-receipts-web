import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderComponent from '@/components/orders/order';
import {getOrder} from '@/services/orders/get-order';
import {getServerSession} from 'next-auth';
import React, {FC} from 'react';

interface OrderProps {
	params: {
		id: string;
	};
}

const Order: FC<OrderProps> = async ({params: {id}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const order = await getOrder({token, id});

	return <OrderComponent order={order} />;
};

export default Order;
