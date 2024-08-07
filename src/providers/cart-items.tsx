'use client';
import {CartItem} from '@/models/cart/cart';
import React, {createContext, FC, useContext} from 'react';

interface Props {
	cartId: string;
	cartItems: CartItem[];
	children: React.ReactNode;
}

const CartItemsContext = createContext({
	cartId: 'none',
	cartItems: [] as CartItem[],
});

export const useLoadedCartItems = () => useContext(CartItemsContext);

const CartItemsProvider: FC<Props> = ({children, cartId, cartItems}) => {
	return (
		<CartItemsContext.Provider
			value={{
				cartId,
				cartItems,
			}}>
			{children}
		</CartItemsContext.Provider>
	);
};

export default CartItemsProvider;
