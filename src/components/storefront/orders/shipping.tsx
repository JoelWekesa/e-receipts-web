import {Shipping} from '@/models/orders/order-client';
import React, {FC} from 'react';

interface Props {
	shipping: Shipping;
}

const ClientShipping: FC<Props> = ({shipping}) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-7'>
			<div className='flex flex-col gap-4'>
				<p className='font-semibold'>Shipping Address</p>
				<p className='text-muted-foreground'>
					{shipping.firstName} {shipping.lastName}
				</p>
				<p className='text-muted-foreground'>{shipping.address}</p>
			</div>

			<div className='flex flex-col gap-4'>
				<p className='font-semibold'>Contact</p>
				<p className='text-muted-foreground'> {shipping.phone}</p>
				{shipping?.email && <p className='text-muted-foreground'>{shipping?.email}</p>}
			</div>

			<div className='flex flex-col gap-4'>
				<p className='font-semibold'>Method</p>
				<p className='text-muted-foreground'>Cash on delivery</p>
			</div>
		</div>
	);
};

export default ClientShipping;
