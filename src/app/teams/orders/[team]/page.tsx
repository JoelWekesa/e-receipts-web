import {options} from '@/app/api/auth/[...nextauth]/options';
import OrderTabs from '@/components/orders/tabs';
import {siteConfig} from '@/config/site';
import {OrderStatus} from '@/models/orders/orders-store';
import orderStores from '@/services/page/orders/orders-store';
import {getStore} from '@/services/page/stores/store/get-store';
import {getTeam} from '@/services/page/teams/get-team';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';

interface Props {
	params: Promise<{
		team: string;
	}>;
}

export async function generateMetadata(props: {params: Promise<{team: string}>}): Promise<Metadata> {
	const params = await props.params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {team: teamId} = params;

	const team = await getTeam({id: teamId, token});

	const store = await getStore({
		token,
		id: team.storeId,
	});

	const shopUrl = `${siteConfig.url}/shop/${encodeURIComponent(store.name)}`;

	const indexable = !!store?.logo;

	return {
		title: `Orders | ${store.displayName}`,
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

const Orders = async (props: Props) => {
	const params = await props.params;

	const {team: id} = params;

	const session = await getServerSession(options);

	const team = await getTeam({id, token: session?.accessToken || ''});

	const storeId = team.storeId;

	const token = session?.accessToken || '';

	const [pending, processing, completed] = await Promise.all([
		orderStores({storeId, status: OrderStatus.PENDING, token}),
		orderStores({storeId, status: OrderStatus.PROCESSING, token}),
		orderStores({storeId, status: OrderStatus.COMPLETED, token}),
	]);

	return (
		<OrderTabs pending={pending} processing={processing} completed={completed} storeId={storeId} teamId={team.id} />
	);
};

export default Orders;
