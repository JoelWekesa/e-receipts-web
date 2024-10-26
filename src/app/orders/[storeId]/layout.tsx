import {options} from '@/app/api/auth/[...nextauth]/options';
import {StoreNav} from '@/components/dashboard/StoreNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {StoreSiteHeader} from '@/components/shared/store-site-header';
import {siteConfig} from '@/config/site';
import {getStore} from '@/services/page/stores/store/get-store';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import {FC, ReactNode} from 'react';

type Params = Promise<{storeId: string}>;

export async function generateMetadata(props: {params: Promise<{storeId: string}>}): Promise<Metadata> {
	const params = await props.params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {storeId: id} = params;
	const store = await getStore({
		token,
		id,
	});

	const shopUrl = `${siteConfig.url}/shop/${encodeURIComponent(store.name)}`;

	const indexable = !!store?.logo;

	return {
		title: `Orders | ${store.displayName}`,
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

const StoreOrdersLayout: FC<{
	children: ReactNode;
	params: Params;
}> = async ({children, params}) => {
	const {storeId: id} = await params;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [stores, teams, permissions] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
	]);

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<StoreSiteHeader storeId={id} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<StoreNav className='mx-6' id={id} />
								</div>
							</div>
						</div>
						<div className='flex min-h-screen w-full flex-col bg-muted/40'>{children}</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default StoreOrdersLayout;
