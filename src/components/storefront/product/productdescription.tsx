'use client';
import Price from './price';
import {Inventory} from '@/models/inventory/inventory';
import {VariantSelector} from './variantselector';
import Prose from './prose';
import {AddToCart} from '../cart/add-to-cart';
import {useAtom} from 'jotai';
import {cartVariant} from '@/atoms/cart/variant';
import {useEffect} from 'react';

export function ProductDescription({product}: {product: Inventory}) {
	const [variant, setVariant] = useAtom(cartVariant);

	useEffect(() => {
		if (product.id !== variant?.inventoryId && product.Variant.length) {
			const mostAffordableVariant = product.Variant.reduce(
				(min, variant) => (variant.price < min.price ? variant : min),
				product.Variant[0]
			);
			const defaultVariantId = mostAffordableVariant.id || undefined;
			const selectedVariantId = variant?.id || defaultVariantId;
			const selectedVariant = product.Variant.find((variant) => variant.id === selectedVariantId);
			setVariant(selectedVariant);
		}
	}, [product, setVariant, variant]);

	return (
		<>
			<div className='mb-6 flex flex-col border-b pb-6 dark:border-neutral-700'>
				<h1 className='mb-2 text-5xl font-medium'>{product.name}</h1>
				<div className='mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white'>
					<Price amount={product?.price || variant?.price.toString() || '0'} currencyCode='KES' />
				</div>
			</div>
			<VariantSelector options={product.Option} variants={product.Variant} />
			{product.description ? (
				<Prose className='mb-6 text-sm leading-tight dark:text-white/[60%]' html={product.description} />
			) : null}
			<AddToCart product={product} />
		</>
	);
}
