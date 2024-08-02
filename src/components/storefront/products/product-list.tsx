import {Inventory} from '@/models/inventory/inventory';
import {FC} from 'react';
import {ProductElement} from './product-element';

export const ProductList: FC<{products: Inventory[]}> = ({products}) => {
	return (
		<ul role='list' data-testid='ProductList' className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
			{products.map((product, index) => (
				<ProductElement key={product.id} inventory={product} priority={index < 2} loading={index < 3 ? 'eager' : 'lazy'} />
			))}
		</ul>
	);
};
