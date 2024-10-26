import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderComponent from '@/components/orders/order';
import {getOrder} from '@/services/orders/get-order';
import {getServerSession} from 'next-auth';
import React, {FC} from 'react';

type Params = Promise<{id: string[]}>;

const Order: FC<{params: Params}> = async ({params}) => {
	const {id} = await params;

	const orderId = id[1];

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const order = await getOrder({token, id: orderId});

	return <OrderComponent order={order} />;
};

export default Order;
