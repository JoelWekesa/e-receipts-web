'use client';

import {cartAtom, openCart} from '@/atoms/cart/add';
import {Sheet, SheetContent, SheetHeader} from '@/components/ui/sheet';
import {Inventory} from '@/models/inventory/inventory';
import {useAtom} from 'jotai';
import {FC} from 'react';
import CartItemsComponent from '../cart/cart-items';
import {ProductElement} from './product-element';

interface Props {
	products: Inventory[];
	shop: string;
}

export const ProductList: FC<Props> = ({products, shop}) => {
	const [open, setOpen] = useAtom(openCart);

	const toggleSheet = () => {
		setOpen(!open);
	};

	const [cart] = useAtom(cartAtom);

	return (
		<>
			<ul role='list' data-testid='ProductList' className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
				{products.map((product, index) => (
					<ProductElement key={product.id} inventory={product} priority={index < 2} loading={index < 3 ? 'eager' : 'lazy'} />
				))}
			</ul>
			<Sheet open={open} onOpenChange={toggleSheet}>
				<SheetContent className='w-[400px] sm:w-[540px]'>
					<SheetHeader>My Cart</SheetHeader>
					<CartItemsComponent cart={cart} shop={shop} />
				</SheetContent>
			</Sheet>
		</>
	);
};
