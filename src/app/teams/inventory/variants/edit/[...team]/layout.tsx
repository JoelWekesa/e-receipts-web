import {options} from '@/app/api/auth/[...nextauth]/options';
import {TeamNav} from '@/components/dashboard/TeamNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {TeamSiteHeader} from '@/components/teams/site-header/site-header';
import {siteConfig} from '@/config/site';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';

export const metadata: Metadata = {
	title: {
		default: 'Edit Variant',
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
	authors: [
		{
			name: 'shadcn',
			url: 'https://shadcn.com',
		},
	],
	creator: 'shadcn',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: '@shadcn',
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

interface InventoryLayoutProps {
	children: React.ReactNode;
	params: {team: string[]};
}

export default async function InventoryLayout({children, params}: InventoryLayoutProps) {
	const session = await getServerSession(options);

	const {team} = params;

	const teamId = team[0];

	const token = session?.accessToken || '';

	const [stores, teams, permissions, {store}] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
		getStoreFromTeam({id: teamId, token}),
	]);

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<TeamSiteHeader storeId={store.id} teamId={teamId} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<TeamNav className='mx-6' id={teamId} />
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
