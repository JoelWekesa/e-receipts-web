import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {MainNav} from '@/components/dashboard/MainNav';
import React, {FC, ReactNode} from 'react';
import {Card, CardContent, CardHeader} from '@/components/ui/card';

import {SiteHeader} from '@/components/site-header';
import {siteConfig} from '@/config/site';
import {Metadata, Viewport} from 'next';

export const metadata: Metadata = {
	title: {
		default: 'Dashboard',
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

interface StoreLayoutProps {
	children: React.ReactNode;
}

const DashBoardLayout: FC<{
	periodtotals: ReactNode;
	periodsales: ReactNode;
	period_all_annual_month: ReactNode;
	top: ReactNode;
	receipts: ReactNode;
}> = ({periodtotals, periodsales, period_all_annual_month, top, receipts}) => {
	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<SiteHeader />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher />
									<MainNav className='mx-6' />
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
		</>
	);
};

export default DashBoardLayout;
