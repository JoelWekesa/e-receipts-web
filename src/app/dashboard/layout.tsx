import {Card, CardContent} from '@/components/ui/card';
import {FC, ReactNode} from 'react';

import {SiteHeader} from '@/components/site-header';
import {Skeleton} from '@/components/ui/skeleton';
import {siteConfig} from '@/config/site';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import {options} from '../api/auth/[...nextauth]/options';
import {getSetting} from '@/services/page/settings/get-setting';
import TimerProvider from '@/providers/timer';

const DynamicMainNav = dynamic(() => import('../../components/dashboard/MainNav').then((mod) => ({
    default: mod.MainNav
})), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const DynamicTeamSwitcher = dynamic(() => import('../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

export const metadata: Metadata = {
	title: {
		default: `Dashboard | ${siteConfig.name}`,
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

const DashBoardLayout: FC<{
	periodtotals: ReactNode;
	periodsales: ReactNode;
	period_all_annual_month: ReactNode;
	top: ReactNode;
	receipts: ReactNode;
}> = async ({periodtotals, periodsales, period_all_annual_month, top, receipts}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [stores, teams, permissions, setting] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
		getSetting(token),
	]);

	return (
		<TimerProvider>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<SiteHeader storeId={setting?.storeId || ''} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<DynamicTeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<DynamicMainNav className='mx-6' />
								</div>
							</div>
						</div>
						<div className='flex min-h-screen w-full flex-col bg-muted/40'>
							<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
								<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
									<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
										{periodtotals}
										{periodsales}
									</div>
									<div>
										<Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
											{period_all_annual_month}
											<CardContent className='p-6 text-sm'>
												{top}
												{receipts}
											</CardContent>
										</Card>
									</div>
								</main>
							</div>
						</div>
					</main>
				</div>
			</div>
		</TimerProvider>
	);
};

export default DashBoardLayout;
