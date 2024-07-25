import {options} from '@/app/api/auth/[...nextauth]/options';
import {StoreNav} from '@/components/dashboard/StoreNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {StoreSiteHeader} from '@/components/shared/store-site-header';
import {siteConfig} from '@/config/site';
import {getInventory} from '@/services/page/inventory/get';
import {getVariant} from '@/services/page/inventory/variants/get';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';

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
	params: {variant: string};
}

export default async function InventoryLayout({children, params}: InventoryLayoutProps) {
	const session = await getServerSession(options);

	const {variant: id} = params;

	const token = session?.accessToken || '';

	const variant = await getVariant({id, token});

	const [stores, teams, permissions, inventory] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
		getInventory({id: variant.inventoryId, token}),
	]);

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<StoreSiteHeader show={false} storeId={inventory.storeId} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<StoreNav className='mx-6' id={inventory.storeId} />
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
