'use client';

import {getOrGenCookie} from '@/app/actions';
import {cartActions, cartAtom, CartVariant} from '@/atoms/cart/add';
import useRemoveFromCart from '@/services/cart/remove';
import {useAtom} from 'jotai';
import {X} from 'lucide-react';

export function DeleteItemButton({item}: {item: CartVariant}) {
	const [_, setActions] = useAtom(cartActions);

	const successFn = async () => {
		const cartId = await getOrGenCookie();
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

	const {mutate: removeItem} = useRemoveFromCart({successFn});

	const [{cart}, setCart] = useAtom(cartAtom);

	const handleDelete = async () => {
		setActions({
			loading: true,
			variantId: item.id,
		});
		const cartId = await getOrGenCookie();
		const {id: variantId} = item;

		removeItem({cartId, variantId});
	};

	return (
		<button
			onClick={() => handleDelete()}
			type='button'
			aria-label='Remove cart item'
			className='flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500'>
			<X className='mx-[1px] h-4 w-4 text-white dark:text-black' />
		</button>
	);
}
