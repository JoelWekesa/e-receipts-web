import {options} from '@/app/api/auth/[...nextauth]/options';
import {siteConfig} from '@/config/site';
import ShippingProvider from '@/providers/shipping';
import getShipping from '@/services/page/shipping/get';
import {Metadata, Viewport} from 'next';
import {getServerSession} from 'next-auth';
import {FC, ReactNode} from 'react';

export const metadata: Metadata = {
	title: {
		default: 'Checkout',
		template: `%s | ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
	authors: [
		{
			name: 'Joel Wekesa',
			url: 'https://joelwekesa.com',
		},
	],
	creator: 'joelwekesa',
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
		creator: '@joelwekesa_',
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

const StoreClientsLayout: FC<{
	children: ReactNode;
	// params: {
	// 	name: string;
	// 	checkout: string;
	// };
}> = async ({children}) => {
	// const {name} = params;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [shipping] = await Promise.all([getShipping({token})]);

	return <ShippingProvider shipping={shipping}>{children}</ShippingProvider>;
};

export default StoreClientsLayout;
