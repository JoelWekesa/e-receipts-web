import {options} from '@/app/api/auth/[...nextauth]/options';
import AllClients from '@/components/clients/all';
import {siteConfig} from '@/config/site';
import {allClients} from '@/services/page/clients/all';
import {Metadata} from 'next';
import {getServerSession} from 'next-auth';

export const metadata: Metadata = {
	title: {
		default: `Clients | ${siteConfig.name}`,
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

const ClientsPage = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const clients = await allClients({token});

	return (
		<div>
			<AllClients clients={clients} />
		</div>
	);
};

export default ClientsPage;
