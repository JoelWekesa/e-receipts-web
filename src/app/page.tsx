import LandingComponent from '@/components/landing';
import {SiteHeader} from '@/components/site-header';
import {getServerSession} from 'next-auth';
import {options} from './api/auth/[...nextauth]/options';
import {Metadata} from 'next';
import {siteConfig} from '@/config/site';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
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
	creator: 'Joel Wekesa',
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

const HomePage = async () => {
	const session = await getServerSession(options);

	console.log({id: session?.accessToken});

	return (
		<>
			<SiteHeader storeId='' />
			<div className='flex-1 space-y-2 pt-6'>
				<LandingComponent />
			</div>
		</>
	);
};

export default HomePage;
