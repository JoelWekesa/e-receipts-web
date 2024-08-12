'use client';
import {Cart} from '@/atoms/cart/add';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {FC} from 'react';
import ShoppingCartItemsComponent from './cart';
import CheckOutForm from './checkout-form';
import {Shipping} from '@/models/shipping/shipping';

interface Props {
	cart: Cart;
	shipping: Shipping | null;
	token: string;
	storeId: string;
}

const MobileCheckOutTabs: FC<Props> = ({cart, shipping, token, storeId}) => {
	return (
		<Tabs defaultValue='shipping' className='w-full'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='shipping'>Shipping</TabsTrigger>
				<TabsTrigger value='confirm'>Confirm</TabsTrigger>
			</TabsList>
			<TabsContent value='shipping'>
				<CheckOutForm shipping={shipping} token={token} />
			</TabsContent>
			<TabsContent value='confirm'>
				<ShoppingCartItemsComponent cart={cart} shippingId={shipping?.id || ''} token={token} storeId={storeId} />
			</TabsContent>
		</Tabs>
	);
};

export default MobileCheckOutTabs;
