'use client';
import {cartAtom} from '@/atoms/cart/add';
import {useAtom} from 'jotai';
import CheckOutForm from './checkout-form';
import ShoppingCartItemsComponent from './cart';
import MobileCheckOutTabs from './mobile';

const CheckOutComponent = () => {
	const [cart] = useAtom(cartAtom);
	return (
		<div>
			<div className='hidden md:block'>
				<div className='grid grid-cols-2 divide-x dark:divide-gray-600 divide-gray-200 h-[600px]'>
					<div className='flex p-2 h-full'>
						<div className='flex w-full px-5'>
							<CheckOutForm />
						</div>
					</div>
					<div className='flex p-2 h-full'>
						<div className='flex w-full px-5'>
							<ShoppingCartItemsComponent cart={cart} />
						</div>
					</div>
				</div>
			</div>
			<div className='block md:hidden p-2'>
				<MobileCheckOutTabs cart={cart} />
			</div>
		</div>
	);
};

export default CheckOutComponent;
