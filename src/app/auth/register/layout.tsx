import {siteConfig} from '@/config/site';
import {Metadata, Viewport} from 'next';
import {FC, ReactNode} from 'react';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Register',
		description: 'Register an account',
		keywords: ['login', 'account', 'eStore'],
		metadataBase: new URL(siteConfig.url),
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
			},
		},

		openGraph: {
			type: 'website',
			locale: 'en_US',
			url: siteConfig.url + '/auth/register',
			title: 'Register',
			description: 'Register your account',
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
			title: 'Register',
			description: 'Register your account',
			images: [siteConfig.ogImage],
			creator: '@joelwekesa_',
		},
		icons: {
			icon: '/favicon.ico',
			shortcut: '/favicon-16x16.png',
			apple: '/apple-touch-icon.png',
		},
	};
}

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

const RegisterLayout: FC<{
	children: ReactNode;
}> = async ({children}) => {
	return <>{children}</>;
};

export default RegisterLayout;
