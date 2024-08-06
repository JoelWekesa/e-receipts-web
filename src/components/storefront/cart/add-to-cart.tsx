'use client';

import {cartVariant} from '@/atoms/cart/variant';
import {Inventory} from '@/models/inventory/inventory';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {PlusIcon} from 'lucide-react';

function SubmitButton({
	availableForSale,
	selectedVariantId,
}: {
	availableForSale: boolean;
	selectedVariantId: string | undefined;
}) {
	const buttonClasses =
		'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
	const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

	if (!availableForSale) {
		return (
			<button disabled className={clsx(buttonClasses, disabledClasses)}>
				Out Of Stock
			</button>
		);
	}

	console.log(selectedVariantId);
	if (!selectedVariantId) {
		return (
			<button aria-label='Please select an option' disabled className={clsx(buttonClasses, disabledClasses)}>
				<div className='absolute left-0 ml-4'>
					<PlusIcon className='h-5' />
				</div>
				Add To Cart
			</button>
		);
	}

	return (
		<button
			aria-label='Add to cart'
			className={clsx(buttonClasses, {
				'hover:opacity-90': true,
			})}
			type='button'
			onClick={() => {
				console.log('Add to cart', selectedVariantId);
			}}>
			<div className='absolute left-0 ml-4'>
				<PlusIcon className='h-5' />
			</div>
			Add To Cart
		</button>
	);
}

export function AddToCart({product}: {product: Inventory}) {
	const [variant, _] = useAtom(cartVariant);

	const defaultVariantId = product.Variant[0].id;
	const selectedVariantId = variant?.id || defaultVariantId;

	return (
		<form>
			<SubmitButton availableForSale={true} selectedVariantId={selectedVariantId} />
		</form>
	);
}
