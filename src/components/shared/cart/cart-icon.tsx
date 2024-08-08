'use client';
import {cartAtom, CartVariant, openCart} from '@/atoms/cart/add';
import {Button} from '@/components/ui/button';
import {useLoadedCartItems} from '@/providers/cart-items';
import useCartItems from '@/services/cart/get';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {ShoppingBagIcon} from 'lucide-react';
import {useEffect} from 'react';

export const CartNavItem = () => {
	const {cartItems, cartId} = useLoadedCartItems();

	const [open, setOpen] = useAtom(openCart);

	const {data: cartInitial} = useCartItems({
		cartId,
		cartItems,
	});
	const [{cart}, setCart] = useAtom(cartAtom);

	useEffect(() => {
		const cartItems: CartVariant[] =
			cartInitial?.map(({variant, quantity}) => {
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
	}, [cartId, cartInitial, setCart]);

	const lineCount = cart.length;

	const toggleSheet = () => {
		setOpen(!open);
		console.log('clicked');
	};

	return (
		<Button variant='ghost' onClick={toggleSheet}>
			<div className='relative flex items-center mr-2' data-testid='CartNavItem'>
				<ShoppingBagIcon className='h-6 w-6 shrink-0' />
				{lineCount > 0 ? (
					<div
						className={clsx(
							'absolute bottom-0 right-0 -mb-2 -mr-2 flex h-4 flex-col items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white',
							lineCount > 9 ? 'w-[3ch]' : 'w-[2ch]'
						)}>
						{lineCount} <span className='sr-only'>item{lineCount > 1 ? 's' : ''} in cart, view bag</span>
					</div>
				) : (
					<span className='sr-only'>0 items in cart</span>
				)}
			</div>
		</Button>
	);
};
