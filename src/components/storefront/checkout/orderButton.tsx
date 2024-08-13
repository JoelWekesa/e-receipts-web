'use client';

import {openCart} from '@/atoms/cart/add';
import useCreateOrder from '@/services/orders/create';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {Loader2, PlusIcon} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {FC} from 'react';

interface Shipping {
	shippingId: string;
	cartId: string;
	storeId: string;
	shop: string;
}

interface ShippingProps {
	shipping: Shipping | null;
	token: string;
}

const OrderButton: FC<ShippingProps> = ({shipping, token}) => {
	const [_, setOpen] = useAtom(openCart);

	const router = useRouter();

	const buttonClasses =
		'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';

	const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

	const successFn = async () => {
		setOpen(false);
		router.push(`/shop/${shipping?.shop}/checkout/order`);
	};

	const {mutate: add, isPending} = useCreateOrder(successFn);

	const handleClick = () => {
		add({
			shipping: {
				shippingId: shipping?.shippingId || '',
				cartId: shipping?.cartId || '',
				storeId: shipping?.storeId || '',
			},
			token,
		});
	};

	return (
		<>
			{isPending || !!!shipping?.shippingId ? (
				<button aria-label='Please select an option' disabled className={clsx(buttonClasses, disabledClasses)}>
					{isPending ? (
						<div className='absolute left-0 ml-4'>{<Loader2 className='h-5' />}</div>
					) : (
						<PlusIcon className='h-5 animate-spin' />
					)}
					{!!!shipping?.shippingId ? 'Confirm Order' : 'Processing'}
				</button>
			) : (
				<button
					className={clsx(buttonClasses, {
						'hover:opacity-90': true,
					})}
					disabled={isPending}
					onClick={handleClick}
					type='button'>
					<PlusIcon className='h-5' />
					Confirm Order
				</button>
			)}
		</>
	);
};

export default OrderButton;
