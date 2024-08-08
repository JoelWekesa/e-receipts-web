'use client';

import {getOrGenCookie} from '@/app/actions';
import {cartAtom, CartVariant} from '@/atoms/cart/add';
import useAddToCart from '@/services/cart/add';
import useSubtractFromCart from '@/services/cart/subtract';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {MinusIcon, PlusIcon} from 'lucide-react';

export function EditItemQuantityButton({type, item}: {item: CartVariant; type: 'plus' | 'minus'}) {
	const {mutate: add} = useAddToCart();
	const {mutate: subtract} = useSubtractFromCart();

	const [{cart}, setCart] = useAtom(cartAtom);

	const handleAdd = async () => {
		const cartId = await getOrGenCookie();
		const updatedCart = cart.map((cartItem) => {
			if (cartItem.id === item.id) {
				return {
					...cartItem,
					items: cartItem.items + 1,
				};
			}

			return cartItem;
		});

		const {id: variantId} = item;

		setCart({
			cartId,
			cart: updatedCart,
		});

		add({cartId, variantId});
	};

	const handleSubtract = async () => {
		const cartId = await getOrGenCookie();
		const {id: variantId} = item;

		const cartItem = cart.find((cartItem) => cartItem.id === item.id);

		if (!cartItem) {
			return;
		}

		if (cartItem.items === 1) {
			const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
			setCart({
				cartId,
				cart: updatedCart,
			});
			subtract({cartId, variantId});
			return;
		}

		const updatedCart = cart.map((cartItem) => {
			if (cartItem.id === item.id) {
				return {
					...cartItem,
					items: cartItem.items - 1,
				};
			}

			return cartItem;
		});

		setCart({
			cartId,
			cart: updatedCart,
		});
		subtract({cartId, variantId});
	};

	return (
		<button
			type='button'
			onClick={type === 'plus' ? () => handleAdd() : () => handleSubtract()}
			aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
			className={clsx(
				'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
				{
					'ml-auto': type === 'minus',
				}
			)}>
			{type === 'plus' ? (
				<PlusIcon className='h-4 w-4 dark:text-neutral-500' />
			) : (
				<MinusIcon className='h-4 w-4 dark:text-neutral-500' />
			)}
		</button>
	);
}
