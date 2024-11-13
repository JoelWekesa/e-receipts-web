import {options} from '@/app/api/auth/[...nextauth]/options';
import CheckOutComponent from '@/components/storefront/checkout';
import {siteConfig} from '@/config/site';
import getShipping from '@/services/page/shipping/get';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {notFound} from 'next/navigation';
import {FC} from 'react';

type Params = Promise<{
	name: string;
}>;

export async function generateMetadata(props: {params: Params}): Promise<Metadata> {
	const params = await props.params;
	const {name} = params;
	const shop = await storeFromName({name});

	if (!shop) return notFound();

	const shopUrl = `${siteConfig.url}/shop/${name}`;

	const store = await storeFromName({name: name});

	const indexable = !!store?.logo;

	return {
		title: `${store.displayName} | ${siteConfig.name}`,
		description: store.displayName,
		keywords: [store.displayName, store.address, ...siteConfig.keywords],
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

const CheckOut: FC<{params: Params}> = async ({params}) => {
	const {name} = await params;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const ship = getShipping({token});

	const sName = storeFromName({name});

	const [shipping, store] = await Promise.all([ship, sName]);

	return <CheckOutComponent shipping={shipping} token={token} storeId={store.id} shop={store.name} />;
};

export default CheckOut;
