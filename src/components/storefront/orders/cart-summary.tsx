import {Cart} from '@/models/orders/order-client';
import {createUrl} from '@/utils/create-url';
import Image from 'next/image';
import Link from 'next/link';
import React, {FC} from 'react';
import Price from '../product/price';
import OrderTotal from './total';

interface Props {
	cart: Cart[];
}

type MerchandiseSearchParams = {
	[key: string]: string;
};

const CartSummary: FC<Props> = ({cart}) => {
	return (
		<div className='flex flex-col gap-2'>
			{cart.map((item, i) => {
				const merchandiseSearchParams = {} as MerchandiseSearchParams;

				const merchandiseUrl = createUrl(
					`/product/${item.variant.variant_name}`,
					new URLSearchParams(merchandiseSearchParams)
				);

				return (
					<li key={i} className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'>
						<div className='relative flex w-full flex-row justify-between px-1 py-4'>
							<div className='flex flex-row'>
								<div className='relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
									<Image
										className='h-full w-full object-contain object-center p-2'
										width={64}
										height={64}
										alt={item.variant.variant_name}
										src={item.variant.inventory.thumbnail}
									/>
								</div>
								<Link href={merchandiseUrl} className='z-30 ml-2 flex flex-row space-x-4'>
									<div className='flex flex-1 flex-col text-base'>
										<span className='leading-tight'>{item.variant.inventory.name}</span>
										<p className='text-sm text-neutral-500 dark:text-neutral-400'>
											{item.variant.name.map((thing, index) => (
												<span key={index}> {thing.value} /</span>
											))}
										</p>
									</div>
								</Link>
							</div>
							<div className='flex h-16 flex-col justify-between'>
								<Price
									className='flex justify-end space-y-2 text-right text-sm'
									amount={(item.quantity * item.variant.price).toString()}
									currencyCode='KES'
								/>

								<div className='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
									<p className='w-6 text-center'>
										<span className='w-full text-sm'>{item.quantity}</span>
									</p>
								</div>
							</div>
						</div>
					</li>
				);
			})}
			<div>
				<OrderTotal cart={cart} />
			</div>
		</div>
	);
};

export default CartSummary;
