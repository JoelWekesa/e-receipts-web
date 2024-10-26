import {options} from '@/app/api/auth/[...nextauth]/options';
import {StoreFrontSiteHeader} from '@/components/shared/store-front-site-header';
import {getCategories} from '@/services/page/inventory/categories/store-categories';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {getServerSession} from 'next-auth';
import {FC, ReactNode} from 'react';

type Params = Promise<{
	inventory: string[];
}>;

// export const metadata: Metadata = {
// 	title: {
// 		default: 'Shop',
// 		template: `%s | ${siteConfig.name}`,
// 	},
// 	metadataBase: new URL(siteConfig.url),
// 	description: siteConfig.description,
// 	keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
// 	authors: [
// 		{
// 			name: 'Joel Wekesa',
// 			url: 'https://joelwekesa.com',
// 		},
// 	],
// 	creator: 'Joel Wekesa',
// 	openGraph: {
// 		type: 'website',
// 		locale: 'en_US',
// 		url: siteConfig.url,
// 		title: siteConfig.name,
// 		description: siteConfig.description,
// 		siteName: siteConfig.name,
// 		images: [
// 			{
// 				url: siteConfig.ogImage,
// 				width: 1200,
// 				height: 630,
// 				alt: siteConfig.name,
// 			},
// 		],
// 	},
// 	twitter: {
// 		card: 'summary_large_image',
// 		title: siteConfig.name,
// 		description: siteConfig.description,
// 		images: [siteConfig.ogImage],
// 		creator: '@joelwekesa_',
// 	},
// 	icons: {
// 		icon: '/favicon.ico',
// 		shortcut: '/favicon-16x16.png',
// 		apple: '/apple-touch-icon.png',
// 	},
// };

// export const viewport: Viewport = {
// 	themeColor: [
// 		{media: '(prefers-color-scheme: light)', color: 'white'},
// 		{media: '(prefers-color-scheme: dark)', color: 'black'},
// 	],
// };

const ShopItemLayout: FC<{
	children: ReactNode;
	params: Params;
}> = async (props) => {
	const params = await props.params;

	const {children} = props;

	const {inventory} = params;

	const store_name = inventory[0];

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [store] = await Promise.all([storeFromName({name: store_name})]);

	const storeId = store.id;

	const categories = await getCategories({storeId, token});

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<StoreFrontSiteHeader store={store} categories={categories} />
					<main className='flex-1'>{children}</main>
				</div>
			</div>
		</>
	);
};

export default ShopItemLayout;
