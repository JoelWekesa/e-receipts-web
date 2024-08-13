'use client';
import {Cart, cartActions} from '@/atoms/cart/add';
import {createUrl} from '@/utils/create-url';
import {DEFAULT_OPTION} from '@/utils/default-options';
import {useAtom} from 'jotai';
import {ShoppingCartIcon} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {FC, useEffect, useState} from 'react';
import {DeleteItemButton} from '../cart/delete-item';
import {EditItemQuantityButton} from '../cart/edit-item-quantity';
import CartItemSkeleton from '../cart/skeleton';
import Price from '../product/price';
import OrderButton from './orderButton';

type MerchandiseSearchParams = {
	[key: string]: string;
};

interface Props {
	cart: Cart;
	shippingId: string;
	storeId: string;
	token: string;
	shop: string;
}

const ShoppingCartItemsComponent: FC<Props> = ({cart, shippingId, storeId, token, shop}) => {
	const [totalCartCost, setTotalCartCost] = useState(0);

	const [{loading, variantId}] = useAtom(cartActions);

	useEffect(() => {
		const totalCartCost = cart.cart.reduce((acc, item) => {
			return acc + item.items * item.price;
		}, 0);

		setTotalCartCost(totalCartCost);
	}, [cart]);

	return (
		<>
			{!cart.cartId || cart.cart.length === 0 ? (
				<div className='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
					<ShoppingCartIcon className='h-16' />
					<p className='mt-6 text-center text-2xl font-bold'>Your cart is empty.</p>
				</div>
			) : (
				<div className='flex h-full flex-col justify-between overflow-hidden p-1 w-full'>
					<ul className='flex-grow overflow-auto py-4'>
						{cart.cart
							.sort((a, b) => {
								const nameA = JSON.stringify(a.name);
								const nameB = JSON.stringify(b.name);

								return nameB.localeCompare(nameA);
							})
							.map((item, i) => {
								const merchandiseSearchParams = {} as MerchandiseSearchParams;

								item.name.forEach(({name, value}) => {
									if (value !== DEFAULT_OPTION) {
										merchandiseSearchParams[name.toLowerCase()] = value;
									}
								});

								const merchandiseUrl = createUrl(`/product/${item.product_name}`, new URLSearchParams(merchandiseSearchParams));

								return (
									<li key={i} className='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'>
										{loading && variantId === item.id ? (
											<CartItemSkeleton />
										) : (
											<div className='relative flex w-full flex-row justify-between px-1 py-4'>
												<div className='absolute z-40 -ml-1 -mt-2'>
													<DeleteItemButton item={item} />
												</div>
												<div className='flex flex-row'>
													<div className='relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
														<Image
															className='h-full w-full object-contain object-center p-2'
															width={64}
															height={64}
															alt={item.variant_name}
															src={item.inventory?.thumbnail || item.description}
														/>
													</div>
													<Link href={merchandiseUrl} className='z-30 ml-2 flex flex-row space-x-4'>
														<div className='flex flex-1 flex-col text-base'>
															<span className='leading-tight'>{item.product_name}</span>
															{item.product_name !== DEFAULT_OPTION ? (
																<p className='text-sm text-neutral-500 dark:text-neutral-400'>
																	{item.name.map((thing, index) => (
																		<span key={index}> {thing.value} /</span>
																	))}
																</p>
															) : null}
														</div>
													</Link>
												</div>
												<div className='flex h-16 flex-col justify-between'>
													<Price
														className='flex justify-end space-y-2 text-right text-sm'
														amount={(item.items * item.price).toString()}
														currencyCode='KES'
													/>

													<div className='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
														<EditItemQuantityButton item={item} type='minus' />
														<p className='w-6 text-center'>
															<span className='w-full text-sm'>{item.items}</span>
														</p>
														<EditItemQuantityButton item={item} type='plus' />
													</div>
												</div>
											</div>
										)}
									</li>
								);
							})}
					</ul>
					<div className='py-4 text-sm text-neutral-500 dark:text-neutral-400'>
						<div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
							<p>Shipping</p>
							<p className='text-right'>Calculated at checkout</p>
						</div>
						<div className='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
							<p>Total</p>
							<Price
								className='text-right text-base text-black dark:text-white'
								amount={'' + totalCartCost}
								currencyCode='KES'
							/>
						</div>
					</div>

					<OrderButton
						shipping={{
							cartId: cart.cartId,
							shippingId,
							storeId,
							shop,
						}}
						token={token}
					/>
				</div>
			)}
		</>
	);
};

export default ShoppingCartItemsComponent;
