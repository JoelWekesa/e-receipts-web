'use client';

import {getOrGenCookie} from '@/app/actions';
import {CartVariant} from '@/atoms/cart/add';
import useRemoveFromCart from '@/services/cart/remove';
import {X} from 'lucide-react';

export function DeleteItemButton({item}: {item: CartVariant}) {
	const {mutate: removeItem} = useRemoveFromCart();

	const handleDelete = async () => {
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
