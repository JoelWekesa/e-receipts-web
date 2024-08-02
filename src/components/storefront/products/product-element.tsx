'use client';
import {formatMoneyRange} from '@/lib/utils';
import {Inventory} from '@/models/inventory/inventory';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import ProductImageWrapper from './product-image-wrapper';

interface Product {
	inventory: Inventory;
	loading: 'eager' | 'lazy';
	priority: boolean;
}

export function ProductElement({inventory, loading, priority}: Product) {
	const [stop, setStop] = useState(0);
	const [start, setStart] = useState(0);

	useEffect(() => {
		if (inventory.Variant.length > 0) {
			const prices = inventory.Variant.map((variant) => variant.price);
			setStart(Math.min(...prices));
			setStop(Math.max(...prices));
		} else {
			setStart(parseFloat(inventory?.price || '0'));
			setStop(parseFloat(inventory?.price || '0'));
		}
	}, [inventory.Variant, inventory.price]);

	return (
		<li data-testid='ProductElement'>
			<Link href={`/shop/item/${inventory.store.name}/${inventory.name}`}>
				<div>
					{inventory?.thumbnail && (
						<ProductImageWrapper
							loading={loading}
							src={inventory?.thumbnail}
							alt={inventory.name}
							width={512}
							height={512}
							sizes={'512px'}
							priority={priority}
						/>
					)}
					<div className='mt-2 flex flex-col p-1'>
						<div>
							<h3 className='mt-1 text-sm font-semibold light:text-neutral-900'>{inventory.name}</h3>
							<p className='mt-1 text-sm font-medium light:text-neutral-900' data-testid='ProductElement_PriceRange'>
								{formatMoneyRange({
									start: {amount: start},
									stop: {amount: stop},
								})}
							</p>
						</div>
						<p className='mt-1 text-sm text-neutral-500' data-testid='ProductElement_Category'>
							{inventory.category?.name}
						</p>
					</div>
				</div>
			</Link>
		</li>
	);
}
