'use client';

import {delCookies} from '@/app/actions';
import {openCart} from '@/atoms/cart/add';
import useCreateOrder from '@/services/orders/create';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {Loader2, PlusIcon} from 'lucide-react';
import {FC} from 'react';

interface Shipping {
	shippingId: string;
	cartId: string;
	storeId: string;
}

interface ShippingProps {
	shipping: Shipping;
	token: string;
}

const OrderButton: FC<ShippingProps> = ({shipping, token}) => {
	const [_, setOpen] = useAtom(openCart);

	const buttonClasses =
		'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';

	const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

	const successFn = async () => {
		await delCookies();
		setOpen(false);
	};

	const {mutate: add, isPending} = useCreateOrder(successFn);

	const handleClick = () => {
		add({shipping, token});
	};

	return (
		<>
			{isPending ? (
				<button aria-label='Please select an option' disabled className={clsx(buttonClasses, disabledClasses)}>
					<div className='absolute left-0 ml-4'>{<Loader2 className='h-5' />}</div>
					Processing
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
