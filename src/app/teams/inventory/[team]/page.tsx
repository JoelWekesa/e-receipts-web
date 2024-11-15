import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreInventory from '@/components/inventory/store/inventory';
import TeamInventoryLayout from '@/components/inventory/team-inventory-layout';
import InventoryClient from '@/config/axios-inventory';
import {siteConfig} from '@/config/site';
import {getStore} from '@/services/page/stores/store/get-store';
import {getTeam} from '@/services/page/teams/get-team';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';

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
		title: `Inventory | ${store.displayName}`,
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

const getInventory = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const getTotal = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store/value?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const InventoryPage = async (props: {params: Promise<{team: string}>}) => {
	const params = await props.params;
	const session = await getServerSession(options);

	const {team} = params;

	const token = session?.accessToken || '';

	const {store} = await getStoreFromTeam({id: team, token});

	const storeId = store.id;

	const [inventory, total] = await Promise.all([getInventory({storeId, token}), getTotal({storeId, token})]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-1'>
			<TeamInventoryLayout teamId={team}>
				<StoreInventory item={{storeId, inventory, total, isTeam: true, teamId: team, storeName: store.displayName}} />
			</TeamInventoryLayout>
		</div>
	);
};

export default InventoryPage;
