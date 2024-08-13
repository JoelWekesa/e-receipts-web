import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderSuccessComponent from '@/components/storefront/orders/success';
import {getOrder} from '@/services/orders/get-order';
import {getServerSession} from 'next-auth';
import {cookies} from 'next/headers';
import React from 'react';

const OrderSuccess = async () => {
	const session = await getServerSession(options);

	const id = (await cookies().get('orderId')?.value) || '';

	const token = session?.accessToken || '';

	const order = await getOrder({
		token,
		id,
	});

	return (
		<div className='container mx-auto'>
			<OrderSuccessComponent order={order} />
		</div>
	);
};

export default OrderSuccess;
