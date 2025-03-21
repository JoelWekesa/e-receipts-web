'use client';
import {cartVariant} from '@/atoms/cart/variant';
import {Inventory} from '@/models/inventory/inventory';
import {useAtom} from 'jotai';
import {AddToCart} from '../cart/add-to-cart';
import Price from './price';
import Prose from './prose';
import {VariantSelector} from './variantselector';
import {H1} from '@/components/titles';

export function ProductDescription({product, shop}: {product: Inventory; shop: string}) {
	const [variant] = useAtom(cartVariant);

	return (
		<>
			<div className='mb-6 flex flex-col border-b pb-6 dark:border-neutral-700'>
				<H1 className='mb-2 text-5xl font-medium'>{product.name}</H1>
				<div className='mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white'>
					<Price amount={variant?.price.toString() || product?.price || '0'} currencyCode='KES' />
				</div>
			</div>
			<VariantSelector options={product?.Option ?? []} variants={product.Variant} />
			{product.description ? (
				<Prose className='mb-6 text-sm leading-tight dark:text-white/[60%]' html={product.description} />
			) : null}
			<AddToCart product={product} shop={shop} />
		</>
	);
}
