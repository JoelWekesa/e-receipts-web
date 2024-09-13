import {siteConfig} from '@/config/site';
import {Metadata, Viewport} from 'next';
import {FC, ReactNode} from 'react';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Password Reset',
		description: 'Password Reset',
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
			url: siteConfig.url + '/auth/login',
			title: 'Password Reset',
			description: 'Password Reset',
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
			title: 'Login',
			description: 'Password Reset',
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

const PasswordResetLayout: FC<{
	children: ReactNode;
}> = async ({children}) => {
	return <>{children}</>;
};

export default PasswordResetLayout;
