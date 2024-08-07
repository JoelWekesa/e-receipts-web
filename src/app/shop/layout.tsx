import CartItemsProvider from '@/providers/cart-items';
import getCartItems from '@/services/page/cart/cookies';
import {cookies} from 'next/headers';
import React, {ReactNode} from 'react';

const ShopLayout = async ({children}: {children: ReactNode}) => {
	const cartId = (await cookies().get('cartId')?.value) || 'none';
	const cartItems = await getCartItems({cartId});

	return (
		<CartItemsProvider cartItems={cartItems} cartId={cartId}>
			{children}
		</CartItemsProvider>
	);
};

export default ShopLayout;
