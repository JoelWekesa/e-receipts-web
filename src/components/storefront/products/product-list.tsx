'use client';

import {openCart} from '@/atoms/cart/add';
import {Sheet, SheetContent, SheetHeader} from '@/components/ui/sheet';
import {Inventory} from '@/models/inventory/inventory';
import {useAtom} from 'jotai';
import {FC} from 'react';
import CartItemsComponent from '../cart/cart-items';
import {ProductElement} from './product-element';

export const ProductList: FC<{products: Inventory[]}> = ({products}) => {
	const [open, setOpen] = useAtom(openCart);

	const toggleSheet = () => {
		setOpen(!open);
	};

	return (
		<>
			<ul role='list' data-testid='ProductList' className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
				{products.map((product, index) => (
					<ProductElement key={product.id} inventory={product} priority={index < 2} loading={index < 3 ? 'eager' : 'lazy'} />
				))}
			</ul>
			<Sheet open={open} onOpenChange={toggleSheet}>
				<SheetContent>
					<SheetHeader>My Cart</SheetHeader>
					<CartItemsComponent />
				</SheetContent>
			</Sheet>
		</>
	);
};
