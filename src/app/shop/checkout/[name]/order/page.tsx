import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderSuccessComponent from '@/components/storefront/orders/success';
import {siteConfig} from '@/config/site';
import {getOrder} from '@/services/orders/get-order';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {cookies} from 'next/headers';
import {notFound} from 'next/navigation';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
	const session = await getServerSession(options);

	const id = (await (await cookies()).get('orderId')?.value) || '';

	const token = session?.accessToken || '';
	const order = await getOrder({
		token,
		id,
	});

	const {name} = order.store;
	const shop = await storeFromName({name});

	if (!shop) return notFound();

	const shopUrl = `${siteConfig.url}/shop/${name}`;

	const checkoutUrl = siteConfig.url + `/shop/checkout/${name}`;

	const store = await storeFromName({name: name});

	const indexable = !!store?.logo;

	return {
		title: `${store.displayName} | Checkout`,
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
			url: checkoutUrl,
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

const OrderSuccess = async () => {
	const session = await getServerSession(options);

	const id = (await (await cookies()).get('orderId')?.value) || '';

	const token = session?.accessToken || '';

	const order = await getOrder({
		token,
		id,
	});

	return (
		<div className='container mx-auto'>
			<OrderSuccessComponent order={order} />
		</div>
	);
};

export default OrderSuccess;
