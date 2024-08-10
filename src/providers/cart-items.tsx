'use client';
import {cartAtom, CartVariant} from '@/atoms/cart/add';
import {CartItem} from '@/models/cart/cart';
import useCartItems from '@/services/cart/get';
import {useAtom} from 'jotai';
import React, {createContext, FC, useContext, useEffect} from 'react';

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
	const {data: cartInitial} = useCartItems({
		cartId,
		cartItems,
	});
	const [_, setCart] = useAtom(cartAtom);

	useEffect(() => {
		const cartItems: CartVariant[] =
			cartInitial
				.filter(({quantity}) => quantity > 0)
				.map(({variant, quantity}) => {
					return {
						...variant,
						items: quantity,
						product_name: variant.inventory.name,
					};
				}) || [];

		setCart({
			cartId,
			cart: cartItems,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartId, cartInitial]);

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
