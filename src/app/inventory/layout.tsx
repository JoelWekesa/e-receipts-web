import {SiteHeader} from '@/components/site-header';
import {siteConfig} from '@/config/site';
import {Metadata, Viewport} from 'next';
import {Skeleton} from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import {getServerSession} from 'next-auth';
import {options} from '../api/auth/[...nextauth]/options';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getSetting} from '@/services/page/settings/get-setting';

export const metadata: Metadata = {
	title: {
		default: 'Inventory',
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
}

const DynamicTeamSwitcher = dynamic(() => import('../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const DynamicMainNav = dynamic(() => import('../../components/dashboard/MainNav').then((mod) => mod.MainNav), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

export default async function InventoryLayout({children}: InventoryLayoutProps) {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [stores, teams, permissions, setting] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
		getSetting(token),
	]);

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<SiteHeader show={false} storeId={setting?.storeId || ''} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<DynamicTeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<DynamicMainNav className='mx-6' />
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
