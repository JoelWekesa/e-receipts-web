import {TeamSiteHeader} from '@/components/teams/site-header/site-header';
import {Skeleton} from '@/components/ui/skeleton';
import {siteConfig} from '@/config/site';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import {FC, ReactNode} from 'react';
import {options} from '../../../api/auth/[...nextauth]/options';
import {TeamNav} from '@/components/dashboard/TeamNav';

type Params = Promise<{id: string[]}>;

const DynamicTeamSwitcher = dynamic(() => import('../../../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

export const metadata: Metadata = {
	title: {
		default: 'Receipt',
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

const StoreDashBoardLayout: FC<{
	children: ReactNode;
	params: Params;
}> = async ({params, children}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [stores, teams, permissions] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
	]);

	const {id} = await params;

	const teamId = id[0];

	const storeId = id[1];

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<TeamSiteHeader storeId={storeId} teamId={teamId} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<DynamicTeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<TeamNav className='mx-6' id={teamId} storeId={storeId} />
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
