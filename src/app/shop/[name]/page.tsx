import {ProductList} from '@/components/storefront/products/product-list';
import {getStoreProductStoreFront} from '@/services/page/inventory/store/store-variants';

const Shop = async ({params}: {params: {name: string}}) => {
	const {name} = params;

	const products = await getStoreProductStoreFront({name});

	return (
		<div className='mx-auto max-w-7xl p-8 pb-16'>
			<ProductList products={products} />
		</div>
	);
};

export default Shop;
