export const siteConfig = {
	name: 'eStore',
	url: process.env.NEXT_PUBLIC_DOMAIN || '',
	ogImage: 'https://receipts-ke.s3.amazonaws.com/logo/opengraph.png',
	description:
		'Say goodbye to paper clutter and lost receipts! eStore’s AI-powered platform simplifies how businesses track sales, manage inventory, and issue digital receipts effortlessly.',
	links: {
		twitter: 'https://x.com/joelwekesa_',
		github: 'https://github.com/JoelWekesa',
	},
};

export type SiteConfig = typeof siteConfig;
