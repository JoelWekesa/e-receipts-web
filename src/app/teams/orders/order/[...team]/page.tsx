import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderComponent from '@/components/orders/order';
import {getOrder} from '@/services/orders/get-order';
import {getServerSession} from 'next-auth';
import React, {FC} from 'react';

type Params = Promise<{team: string}>;

const Order: FC<{params: Params}> = async ({params}) => {
	const {team} = await params;

	const id = team[1];

	const teamId = team[0];

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const order = await getOrder({token, id});

	return (
		<div className='container mx-auto'>
			<OrderComponent order={order} teamId={teamId} />
		</div>
	);
};

export default Order;
