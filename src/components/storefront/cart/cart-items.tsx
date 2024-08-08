'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import {cartAtom, CartVariant} from '@/atoms/cart/add';
import {useLoadedCartItems} from '@/providers/cart-items';
import {AddToCartEnum} from '@/services/cart/add';
import useCartItems from '@/services/cart/get';
import {RemoveFromCartEnum} from '@/services/cart/remove';
import {SubtractFromCartEnum} from '@/services/cart/subtract';
import {createUrl} from '@/utils/create-url';
import {DEFAULT_OPTION} from '@/utils/default-options';
import {useMutationState} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {Loader2, ShoppingCartIcon} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useFormStatus} from 'react-dom';
import Price from '../product/price';
import {DeleteItemButton} from './delete-item';
import {EditItemQuantityButton} from './edit-item-quantity';

type MerchandiseSearchParams = {
	[key: string]: string;
};
const CartItemsComponent = () => {
	const {cartItems, cartId} = useLoadedCartItems();

	const {data: cartInitial} = useCartItems({
		cartId,
		cartItems,
	});

	const variables = useMutationState({
		filters: {mutationKey: [AddToCartEnum.ADD_TO_CART], status: 'pending'},
		select: (mutation) => mutation.state.variables,
	});

	const subtractVariables = useMutationState({
		filters: {mutationKey: [SubtractFromCartEnum.SUBTRACT_FROM_CART], status: 'pending'},
		select: (mutation) => mutation.state.variables,
	});

	const removeFromCartVariables = useMutationState({
		filters: {mutationKey: [RemoveFromCartEnum.REMOVE_FROM_CART], status: 'pending'},
		select: (mutation) => mutation.state.variables,
	});

	const [cart, setCart] = useAtom(cartAtom);

	const [totalCartCost, setTotalCartCost] = useState(0);

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
	}, [cartId, cartInitial]);

	useEffect(() => {
		if (variables.length > 0) {
			const {cartId, variantId} = variables[0] as {cartId: string; variantId: string};

			const cartItem = cart.cart.find((item) => item.id === variantId);

			if (cartItem) {
				const updatedCart = cart.cart.map((item) => {
					if (item.id === variantId) {
						return {
							...item,
							items: item.items + 1,
						};
					}

					return item;
				});

				setCart({
					cartId,
					cart: updatedCart,
				});
			}
		}
	}, [variables]);

	useEffect(() => {
		if (subtractVariables.length > 0) {
			const {cartId, variantId} = subtractVariables[0] as {cartId: string; variantId: string};

			const cartItem = cart.cart.find((item) => item.id === variantId);

			if (cartItem) {
				const updatedCart = cart.cart.map((item) => {
					if (item.id === variantId) {
						return {
							...item,
							items: item.items - 1,
						};
					}

					return item;
				});

				const filteredCart = updatedCart.filter((item) => item.items > 0);

				setCart({
					cartId,
					cart: filteredCart,
				});
			}
		}
	}, [subtractVariables]);

	useEffect(() => {
		if (removeFromCartVariables.length > 0) {
			const {cartId, variantId} = removeFromCartVariables[0] as {cartId: string; variantId: string};

			const updatedCart = cart.cart.filter((item) => item.id !== variantId);

			setCart({
				cartId,
				cart: updatedCart,
			});
		}
	}, [removeFromCartVariables]);

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
				<div className='flex h-full flex-col justify-between overflow-hidden p-1'>
					<ul className='flex-grow overflow-auto py-4'>
						{cart.cart
							.sort((a, b) => a.product_name.localeCompare(b.product_name))
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
					<form>
						<CheckoutButton />
					</form>
				</div>
			)}
		</>
	);
};

function CheckoutButton() {
	const {pending} = useFormStatus();

	return (
		<button
			className='block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
			type='submit'
			disabled={pending}>
			{pending ? <Loader2 className='bg-white' /> : 'Proceed to Checkout'}
		</button>
	);
}

export default CartItemsComponent;
