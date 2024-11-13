import {SiteHeader} from '@/components/site-header';
import {Skeleton} from '@/components/ui/skeleton';
import {siteConfig} from '@/config/site';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import {FC, ReactNode} from 'react';

import {MainNav} from '@/components/dashboard/MainNav';
import {options} from '../api/auth/[...nextauth]/options';
import {getSetting} from '@/services/page/settings/get-setting';

const DynamicTeamSwitcher = dynamic(() => import('../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

export const metadata: Metadata = {
	title: {
		default: 'Clients',
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: siteConfig.keywords,
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
};

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

const ClientsLayout: FC<{
	children: ReactNode;
}> = async ({children}) => {
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
					<SiteHeader storeId={setting?.storeId || ''} />
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

export default ClientsLayout;
