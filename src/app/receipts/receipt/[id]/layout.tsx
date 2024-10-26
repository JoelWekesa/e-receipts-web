import {MainNav} from '@/components/dashboard/MainNav';
import {SiteHeader} from '@/components/site-header';
import {Skeleton} from '@/components/ui/skeleton';
import {siteConfig} from '@/config/site';
import {getSell} from '@/services/page/sales/item';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import {FC, ReactNode} from 'react';
import {options} from '../../../api/auth/[...nextauth]/options';
import {getStore} from '@/services/page/stores/store/get-store';

type Params = Promise<{id: string}>;

const DynamicTeamSwitcher = dynamic(() => import('../../../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

export async function generateMetadata(props: {params: Params}): Promise<Metadata> {
	const params = await props.params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {id} = params;

	const receipt = await getSell({
		id,
		token,
	});

	const store = await getStore({
		token,
		id: receipt.storeId,
	});

	const shopUrl = `${siteConfig.url}/shop/${encodeURIComponent(store.name)}`;

	const indexable = !!store?.logo;

	return {
		title: `Receipt | ${store.displayName}`,
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

const StoreDashBoardLayout: FC<{
	children: ReactNode;
	params: Params;
}> = async (props) => {
	const params = await props.params;

	const {children} = props;

	const {id} = params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [stores, teams, permissions, receipt] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
		getSell({id, token}),
	]);

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<SiteHeader storeId={receipt?.storeId || ''} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<DynamicTeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<MainNav className='mx-6' />
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

export default StoreDashBoardLayout;
