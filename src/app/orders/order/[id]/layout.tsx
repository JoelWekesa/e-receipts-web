import {options} from '@/app/api/auth/[...nextauth]/options';
import {StoreNav} from '@/components/dashboard/StoreNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {StoreSiteHeader} from '@/components/shared/store-site-header';
import {siteConfig} from '@/config/site';
import getOrder from '@/services/page/orders/order';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import {FC, ReactNode} from 'react';

export const metadata: Metadata = {
	title: {
		default: 'Orders',
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
};

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

const StoreOrderLayout: FC<{
	children: ReactNode;
	params: {id: string};
}> = async ({children, params}) => {
	const {id} = params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [order, stores, teams, permissions] = await Promise.all([
		getOrder({token, id}),
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
	]);

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<StoreSiteHeader storeId={order.storeId} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<StoreNav className='mx-6' id={order.storeId} />
								</div>
							</div>
						</div>
						<div className='flex min-h-screen container mx-auto flex-col bg-muted/40'>{children}</div>
					</main>
				</div>
			</div>
		</>
	);
};

export default StoreOrderLayout;
