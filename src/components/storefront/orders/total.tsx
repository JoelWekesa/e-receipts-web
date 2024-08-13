import {Cart} from '@/models/orders/order-client';
import React, {FC} from 'react';
import Price from '../product/price';
interface Props {
	cart: Cart[];
}

const OrderTotal: FC<Props> = ({cart}) => {
	const total = cart.reduce((sum, item) => sum + item.quantity * item.variant.price, 0);

	return (
		<div className='flex flex-row justify-between mt-5'>
			<p className='font-semibold text-lg'>Total</p>
			<Price className='flex justify-end space-y-2 text-right text-sm' amount={total.toString()} currencyCode='KES' />
		</div>
	);
};

export default OrderTotal;
