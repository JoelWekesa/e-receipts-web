import {ProductList} from '@/components/storefront/products/product-list';
import {getStoreProductStoreFront} from '@/services/page/inventory/store/store-variants';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';

export async function generateMetadata({params}: {params: {name: string}}): Promise<Metadata> {
	const {name} = params;
	const shop = await storeFromName({name});

	if (!shop) return notFound();

	const {
		url,
		width,
		height,
		altText: alt,
	} = {
		url: shop.logo,
		width: 1200,
		height: 630,
		altText: shop.displayName,
	};
	const indexable = !!shop.logo;

	return {
		title: shop.displayName,
		description: shop.displayName,
		robots: {
			index: indexable,
			follow: indexable,
			googleBot: {
				index: indexable,
				follow: indexable,
			},
		},
		openGraph: url
			? {
					images: [
						{
							url,
							width,
							height,
							alt,
						},
					],
			  }
			: null,
	};
}

const Shop = async ({params}: {params: {name: string}}) => {
	const {name} = params;

	const prods = getStoreProductStoreFront({name});
	const store = storeFromName({name});

	const [shop, products] = await Promise.all([store, prods]);

	if (!shop) return notFound();

	const productJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: shop.name,
		description: shop.displayName,
		image: shop.logo,
		offers: {
			'@type': 'AggregateOffer',
			availability: products.length ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
			priceCurrency: 'KES',
			highPrice: 1000,
			lowPrice: 100,
		},
	};

	return (
		<div className='mx-auto max-w-7xl p-8 pb-16'>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<ProductList products={products} shop={shop.name} />
		</div>
	);
};

export default Shop;
