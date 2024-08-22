import {ProductList} from '@/components/storefront/products/product-list';
import {siteConfig} from '@/config/site';
import {getStoreProductStoreFront} from '@/services/page/inventory/store/store-variants';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';

export async function generateMetadata({params}: {params: {name: string}}): Promise<Metadata> {
	const {name: storeName} = params;

	const shopUrl = `${siteConfig.url}/shop/${storeName}`;

	const store = await storeFromName({name: storeName});

	const indexable = !!store?.logo;

	return {
		title: `${store.displayName} | ${siteConfig.name}`,
		description: store.displayName,
		keywords: [store.displayName, store.address],
		metadataBase: new URL(shopUrl),
		robots: {
			index: indexable,
			follow: indexable,
			googleBot: {
				index: indexable,
				follow: indexable,
			},
		},

		openGraph: {
			type: 'website',
			locale: 'en_US',
			url: shopUrl,
			title: store.displayName,
			description: store.displayName,
			siteName: store.displayName,
			images: [
				{
					url: store.logo,
					width: 1200,
					height: 630,
					alt: store.name,
				},
			],
		},

		twitter: {
			card: 'summary_large_image',
			title: store.displayName,
			description: store.displayName,
			images: [store.logo],
			creator: '@joelwekesa_',
		},
		icons: {
			icon: '/favicon.ico',
			shortcut: '/favicon-16x16.png',
			apple: '/apple-touch-icon.png',
		},
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
