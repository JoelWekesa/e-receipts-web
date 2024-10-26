import {ProductProvider} from '@/components/storefront/product/context/product-context';
import {Gallery} from '@/components/storefront/product/gallery';
import {ProductDescription} from '@/components/storefront/product/productdescription';
import {siteConfig} from '@/config/site';
import {getStoreInventoryItem} from '@/services/page/inventory/store/store-inventory-item';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {FC, Suspense} from 'react';

interface Props {
	params: Promise<{inventory: string[]}>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const {inventory} = params;

    const storeName = inventory[0];

    const name = inventory[1];

    const [inventoryItem, storeItem] = await Promise.all([
		getStoreInventoryItem({store: storeName, name}),
		storeFromName({name: storeName}),
	]);

    const shopUrl = `${siteConfig.url}/shop/${storeName}`;

    const itemUrl = `${shopUrl}/item/${name}`;

    const indexable = !!inventoryItem?.thumbnail;

    return {
		title: {
			default: `${inventoryItem.name} | ${storeItem?.displayName}`,
			template: `%s | ${storeItem?.displayName}`,
		},
		description: inventoryItem.description,
		keywords: [inventoryItem.name, inventoryItem?.description || ''],
		metadataBase: new URL(itemUrl),
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
			url: itemUrl,
			title: inventoryItem.name,
			description: inventoryItem.description,
			siteName: inventoryItem.name,
			images: [
				{
					url: inventoryItem.thumbnail || '',
					width: 1200,
					height: 630,
					alt: inventoryItem.name,
				},
			],
		},

		twitter: {
			card: 'summary_large_image',
			title: inventoryItem.name,
			description: inventoryItem.description,
			images: [inventoryItem.thumbnail || ''],
			creator: '@joelwekesa_',
		},
		icons: {
			icon: '/favicon.ico',
			shortcut: '/favicon-16x16.png',
			apple: '/apple-touch-icon.png',
		},
	};
}

const Item: FC<Props> = async props => {
    const params = await props.params;
    const {inventory} = params;

    const store = inventory[0];
    const name = inventory[1];

    const inventoryItem = await getStoreInventoryItem({store, name});

    const thumbnailImage = {
		src: inventoryItem?.thumbnail || '',
		altText: Math.random().toString(),
	};

    const allImages = [
		thumbnailImage,
		...inventoryItem?.images.map((image) => ({src: image, altText: Math.random().toString()})),
	];

    const maxVariantPrice = inventoryItem?.Variant.reduce(
		(max, variant) => (variant.price > max ? variant.price : max),
		0
	);

    const minVariantPrice = inventoryItem?.Variant.reduce(
		(min, variant) => (variant.price < min ? variant.price : min),
		Infinity
	);

    const productJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: inventoryItem?.name,
		description: inventoryItem?.description,
		image: inventoryItem?.images[0],
		offers: {
			'@type': 'AggregateOffer',
			availability:
				!!inventoryItem?.price || inventoryItem.Variant.length
					? 'https://schema.org/InStock'
					: 'https://schema.org/OutOfStock',
			priceCurrency: 'KES',
			highPrice: maxVariantPrice || inventoryItem?.price,
			lowPrice: minVariantPrice || inventoryItem?.price,
		},
	};

    return (
		<ProductProvider>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<div className='mx-auto max-w-screen-2xl px-4'>
				<div className='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black'>
					<div className='h-full w-full basis-full lg:basis-4/6'>
						<Suspense fallback={<div className='relative aspect-square h-full max-h-[550px] w-full overflow-hidden' />}>
							<Gallery images={allImages} />
						</Suspense>
					</div>

					<div className='basis-full lg:basis-2/6'>
						<Suspense fallback={null}>
							<ProductDescription product={inventoryItem} shop={store} />
						</Suspense>
					</div>
				</div>
				{/* <RelatedProducts id={product.id} /> */}
			</div>
			{/* <Footer /> */}
		</ProductProvider>
	);
};

export default Item;
