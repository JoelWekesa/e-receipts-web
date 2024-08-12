import {ProductProvider} from '@/components/storefront/product/context/product-context';
import {Gallery} from '@/components/storefront/product/gallery';
import {ProductDescription} from '@/components/storefront/product/productdescription';
import {getStoreInventoryItem} from '@/services/page/inventory/store/store-inventory-item';
import {FC, Suspense} from 'react';

interface Props {
	params: {inventory: string[]};
}

const Item: FC<Props> = async ({params}) => {
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
