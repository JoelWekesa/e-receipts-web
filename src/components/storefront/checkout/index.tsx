'use client';
import {cartAtom} from '@/atoms/cart/add';
import {Shipping} from '@/models/shipping/shipping';
import {useShippingLoaded} from '@/providers/shipping';
import useShipping from '@/services/shipping/get';
import {useAtom} from 'jotai';
import {FC} from 'react';
import ShoppingCartItemsComponent from './cart';
import CheckOutForm from './checkout-form';
import MobileCheckOutTabs from './mobile';

interface Props {
	shipping: Shipping;
	token: string;
	storeId: string;
	shop: string;
}

const CheckOutComponent: FC<Props> = ({storeId, token, shop}) => {
	const [cart] = useAtom(cartAtom);

	const {shipping: loaded} = useShippingLoaded();

	const {data} = useShipping({
		shipping: loaded,
	});

	return (
		<div className='h-screen'>
			<div className='hidden md:block'>
				<div className='grid grid-cols-2 divide-x dark:divide-gray-600 divide-gray-200 h-[600px]'>
					<div className='flex p-2 h-full'>
						<div className='flex w-full px-5'>
							<CheckOutForm shipping={data} token={token} />
						</div>
					</div>
					<div className='flex p-2 h-full'>
						<div className='flex w-full px-5'>
							<ShoppingCartItemsComponent
								cart={cart}
								shippingId={data?.id || ''}
								storeId={storeId}
								token={token}
								shop={shop}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='block md:hidden p-2'>
				<MobileCheckOutTabs cart={cart} shipping={data} storeId={storeId} token={token} shop={shop} />
			</div>
		</div>
	);
};

export default CheckOutComponent;
