import {ProductList} from '@/components/storefront/products/product-list';
import {ProductNotFound} from '@/components/storefront/search/notfound';
import {H1} from '@/components/titles';
import {searchInventory} from '@/services/page/search/inventory';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {notFound, redirect, RedirectType} from 'next/navigation';

export async function generateMetadata(props: {params: Promise<{name: string}>}): Promise<Metadata> {
	const params = await props.params;
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

const SearchPage = async (props: {
	searchParams: Promise<{
		q?: string;
	}>;

	params: Promise<{
		name: string;
	}>;
}) => {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const query = searchParams.q;

	if (!query) {
		return redirect('/', RedirectType.replace);
	}

	const {name} = params;

	const store = storeFromName({name});

	const inv = await searchInventory({
		name,
		query,
	});

	const [shop, inventory] = await Promise.all([store, inv]);

	if (!shop) return notFound();

	const converted = inventory.hits.map((item) => ({
		...item,
		price: '' + item.price,
	}));

	return (
		<div className='mx-auto max-w-7xl p-8 pb-16'>
			<H1 className='text-3xl font-bold leading-none tracking-tight text-foreground py-5'>Searching for {query}</H1>
			{converted.length ? <ProductList products={converted} shop={name} /> : <ProductNotFound query={query} />}
		</div>
	);
};

export default SearchPage;
