import {options} from '@/app/api/auth/[...nextauth]/options';
import CheckOutComponent from '@/components/storefront/checkout';
import getShipping from '@/services/page/shipping/get';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import {notFound} from 'next/navigation';
import {FC} from 'react';

interface Props {
	params: {
		name: string;
		checkout: string;
	};
}

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

const CheckOut: FC<Props> = async ({params}) => {
	const {name} = params;

	console.log({name});

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const ship = getShipping({token});

	const sName = storeFromName({name});

	const [shipping, store] = await Promise.all([ship, sName]);

	return <CheckOutComponent shipping={shipping} token={token} storeId={store.id} shop={store.name} />;
};

export default CheckOut;
