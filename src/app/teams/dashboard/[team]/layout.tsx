import {TeamNav} from '@/components/dashboard/TeamNav';
import {TeamSiteHeader} from '@/components/teams/site-header/site-header';
import {Card, CardContent} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {siteConfig} from '@/config/site';
import {getStore} from '@/services/page/stores/store/get-store';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeam} from '@/services/page/teams/get-team';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import {FC, ReactNode} from 'react';
import {options} from '../../../api/auth/[...nextauth]/options';

const DynamicTeamSwitcher = dynamic(() => import('../../../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

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
		title: `Dashboard | ${store.displayName}`,
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

const StoreDashBoardLayout: FC<{
	periodsales: ReactNode;
	period_all_annual_month: ReactNode;
	periodtotals: ReactNode;
	receipts: ReactNode;
	top: ReactNode;
	params: {team: string};
}> = async ({periodsales, period_all_annual_month, periodtotals, receipts, top, params}) => {
	const session = await getServerSession(options);

	console.log({
		params,
	});

	const token = session?.accessToken || '';

	const [stores, teams, permissions] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
	]);

	const {team: teamId} = params;

	const storeFromTeam = await getStoreFromTeam({
		token,
		id: teamId,
	});

	const {id: storeId} = storeFromTeam.store;

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
									<TeamNav className='mx-6' id={teamId} storeId={storeFromTeam.id} />
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

export default StoreDashBoardLayout;
