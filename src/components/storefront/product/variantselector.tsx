'use client';

import {cartVariant} from '@/atoms/cart/variant';
import {Option} from '@/atoms/inventory/options';
import {Variant} from '@/models/inventory/inventory';
import clsx from 'clsx';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {useProduct, useUpdateURL} from './context/product-context';

type Combination = {
	id: string;
	availableForSale: boolean;
	[key: string]: string | boolean;
};

export function VariantSelector({options, variants}: {options: Option[]; variants: Variant[]}) {
	const [_, setSelectedVariant] = useAtom(cartVariant);
	const {state, updateOption} = useProduct();

	const updateURL = useUpdateURL();
	const hasNoOptionsOrJustOneOption = variants.length === 1 || options.length === 0;

	const combinations: Combination[] = variants.map((variant) => ({
		id: variant.id,
		availableForSale: variant.quantity > 0,
		...variant.name.reduce((accumulator, option) => ({...accumulator, [option.name.toLowerCase()]: option.value}), {}),
	}));

	useEffect(() => {
		const optionKeys = options.map((option) => option.name.toLowerCase());

		console.log(optionKeys);

		if (optionKeys.length === 0 || variants.length === 1) {
			setSelectedVariant(variants[0]);
			return;
		}

		if (Object.keys(state).length !== optionKeys.length) {
			setSelectedVariant(undefined);
			return;
		}

		const foreignKeys = Object.keys(state).filter((key) => !optionKeys.includes(key));

		for (const key of foreignKeys) {
			delete state[key];
		}

		const selectedVariant = combinations.find((combination) =>
			Object.entries(state).every(([key, value]) => combination[key] === value)
		);

		console.log({
			selectedVariant: optionKeys.length,
		});

		console.log({
			state: Object.entries(state).length,
		});

		const variant = variants.find((variant) => variant.id === selectedVariant?.id);

		setSelectedVariant(variant);
	}, [combinations, options, setSelectedVariant, state, variants]);

	if (hasNoOptionsOrJustOneOption) {
		return null;
	}

	return options.map((option) => (
		<form key={option.id}>
			<dl className='mb-8'>
				<dt className='mb-4 text-sm uppercase tracking-wide'>{option.name}</dt>
				<dd className='flex flex-wrap gap-3'>
					{option.options.map((value) => {
						const optionNameLowerCase = option.name.toLowerCase();

						// Base option params on current selectedOptions so we can preserve any other param state.
						const optionParams = {...state, [optionNameLowerCase]: value};

						// Filter out invalid options and check if the option combination is available for sale.
						const filtered = Object.entries(optionParams).filter(([key, value]) =>
							options.find((option) => option.name.toLowerCase() === key && option.options.includes(value))
						);
						const isAvailableForSale = combinations.find((combination) =>
							filtered.every(([key, value]) => combination[key] === value && combination.availableForSale)
						);

						// The option is active if it's in the selected options.
						const isActive = state[optionNameLowerCase] === value;

						return (
							<button
								formAction={() => {
									const newState = updateOption(optionNameLowerCase, value);
									updateURL(newState);
								}}
								key={value}
								aria-disabled={!isAvailableForSale}
								disabled={!isAvailableForSale}
								title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
								className={clsx(
									'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
									{
										'cursor-default ring-2 ring-blue-600': isActive,
										'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600':
											!isActive && isAvailableForSale,
										'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
											!isAvailableForSale,
									}
								)}>
								{value}
							</button>
						);
					})}
				</dd>
			</dl>
		</form>
	));
}
