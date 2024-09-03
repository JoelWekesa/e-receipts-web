import {SiteHeader} from '@/components/site-header';
import {siteConfig} from '@/config/site';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import {options} from '../api/auth/[...nextauth]/options';
import {getSetting} from '@/services/page/settings/get-setting';
import TimerProvider from '@/providers/timer';

export const metadata: Metadata = {
	title: {
		default: `Stores Management | ${siteConfig.name}`,
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

interface StoreLayoutProps {
	children: React.ReactNode;
}

export default async function StoresLayout({children}: StoreLayoutProps) {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const setting = await getSetting(token);

	return (
		<TimerProvider>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<SiteHeader show={false} storeId={setting?.storeId || ''} />

					<main className='flex-1'>{children}</main>
				</div>
			</div>
		</TimerProvider>
	);
}
