import {options} from '@/app/api/auth/[...nextauth]/options';
import {TeamNav} from '@/components/dashboard/TeamNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {TeamSiteHeader} from '@/components/teams/site-header/site-header';
import {siteConfig} from '@/config/site';
import {getStore} from '@/services/page/stores/store/get-store';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeam} from '@/services/page/teams/get-team';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';

export async function generateMetadata({params}: {params: {team: string}}): Promise<Metadata> {
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
		title: `Add Inventory | ${store.displayName}`,
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

interface InventoryLayoutProps {
	children: React.ReactNode;
	params: {team: string};
}

export default async function InventoryLayout({children, params}: InventoryLayoutProps) {
	const session = await getServerSession(options);

	const {team} = params;

	const token = session?.accessToken || '';

	const [stores, teams, permissions, {store}] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
		getStoreFromTeam({id: team, token}),
	]);

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<TeamSiteHeader storeId={store.id} teamId={team} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<TeamNav className='mx-6' id={team} />
								</div>
							</div>
						</div>

						{children}
					</main>
				</div>
			</div>
		</>
	);
}
