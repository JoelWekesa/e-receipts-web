'use client';

import {cartActions, cartAtom, CartVariant} from '@/atoms/cart/add';
import {useLoadedCartItems} from '@/providers/cart-items';
import useAddToCart from '@/services/cart/add';
import useRemoveFromCart from '@/services/cart/remove';
import useSubtractFromCart from '@/services/cart/subtract';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {MinusIcon, PlusIcon} from 'lucide-react';

export function EditItemQuantityButton({type, item}: {item: CartVariant; type: 'plus' | 'minus'}) {
	const [{loading}, setActions] = useAtom(cartActions);

	const {cartId} = useLoadedCartItems();

	const removeSuccessFn = async () => {
		const cartItem = cart.find((cartItem) => cartItem.id === item.id);

		if (!cartItem) {
			return;
		}

		const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);

		setCart({
			cartId,
			cart: updatedCart,
		});

		setActions({
			loading: false,
			variantId: '',
		});
	};

	const {mutate: removeItem} = useRemoveFromCart({successFn: removeSuccessFn});

	const successFn = async ({type}: {type: 'plus' | 'minus'}) => {
		const updatedCart = cart.map((cartItem) => {
			if (cartItem.id === item.id) {
				return {
					...cartItem,
					items: type === 'plus' ? cartItem.items + 1 : cartItem.items - 1,
				};
			}

			return cartItem;
		});

		setCart({
			cartId,
			cart: updatedCart,
		});

		setActions({
			loading: false,
			variantId: '',
		});
	};

	const {mutate: add} = useAddToCart({successFn: () => successFn({type: 'plus'})});
	const {mutate: subtract} = useSubtractFromCart({successFn: () => successFn({type: 'minus'})});

	const [{cart}, setCart] = useAtom(cartAtom);

	const handleAdd = async () => {
		const {id: variantId} = item;

		setActions({
			loading: true,
			variantId,
		});

		add({cartId, variantId});
	};

	const handleSubtract = async () => {
		setActions({
			loading: true,
			variantId: item.id,
		});

		const {id: variantId} = item;

		const cartItem = cart.find((cartItem) => cartItem.id === item.id);

		if (cartItem?.items === 1) {
			removeItem({cartId, variantId});
			return;
		}

		if (!cartItem) {
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
			)}
			disabled={loading}>
			{type === 'plus' ? (
				<PlusIcon className='h-4 w-4 dark:text-neutral-500' />
			) : (
				<MinusIcon className='h-4 w-4 dark:text-neutral-500' />
			)}
		</button>
	);
}
