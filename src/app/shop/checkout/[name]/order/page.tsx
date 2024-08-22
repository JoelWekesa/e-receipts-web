import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderSuccessComponent from '@/components/storefront/orders/success';
import {getOrder} from '@/services/orders/get-order';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {cookies} from 'next/headers';
import {notFound} from 'next/navigation';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
	const session = await getServerSession(options);

	const id = (await cookies().get('orderId')?.value) || '';

	const token = session?.accessToken || '';
	const order = await getOrder({
		token,
		id,
	});

	const {name} = order.store;
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

const OrderSuccess = async () => {
	const session = await getServerSession(options);

	const id = (await cookies().get('orderId')?.value) || '';

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
