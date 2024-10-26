import {options} from '@/app/api/auth/[...nextauth]/options';
import {StoreNav} from '@/components/dashboard/StoreNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {StoreSiteHeader} from '@/components/shared/store-site-header';
import {siteConfig} from '@/config/site';
import {getStoreTransaction} from '@/services/page/float/transaction';
import {getStore} from '@/services/page/stores/store/get-store';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import {FC, ReactNode} from 'react';

type Params = Promise<{id: string}>;

export async function generateMetadata(props: {params: Params}): Promise<Metadata> {
	const params = await props.params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {id: transactionId} = params;
	const transaction = await getStoreTransaction({
		token,
		transactionId,
	});

	const storeId = transaction.float.storeId;

	const store = await getStore({
		token,
		id: storeId,
	});

	const shopUrl = `${siteConfig.url}/shop/${encodeURIComponent(store.name)}`;

	const indexable = !!store?.logo;

	return {
		title: `Float | ${store.displayName}`,
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

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

const StoreClientsLayout: FC<{
	children: ReactNode;
	params: Params;
}> = async (props) => {
	const params = await props.params;

	const {children} = props;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [stores, teams, permissions] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
	]);

	const transaction = await getStoreTransaction({token, transactionId: params.id});

	const storeId = transaction.float.storeId;

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<StoreSiteHeader storeId={storeId} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<StoreNav className='mx-6' id={storeId} />
								</div>
							</div>
						</div>
						{children}
					</main>
				</div>
			</div>
		</>
	);
};

export default StoreClientsLayout;
