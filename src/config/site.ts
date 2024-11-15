export const siteConfig = {
	name: 'eStore',
	url: process.env.NEXT_PUBLIC_DOMAIN || '',
	ogImage: 'https://receipts-ke.s3.us-east-1.amazonaws.com/logo/og.png',
	description:
		'The smart way to run your business. An all-in-one platform to manage your business, from customers to inventory, and everything in between.',
	links: {
		twitter: 'https://x.com/joelwekesa_',
		handle: '@joelwekesa_',
		github: 'https://github.com/JoelWekesa',
	},

	author: {
		name: "Joel Wekesa",
		url: "https://x.com/joelwekesa_"
	},


	keywords: [
		// Business Operations
		'point of sale system', 'POS software', 'business management software',
		'retail management system', 'small business solutions', 'merchant services',
		'small business solutions software',

		// Receipt Management
		'paperless receipts', 'electronic receipts', 'receipt management',
		'receipt tracking software', 'digital invoice system', 'automated receipts',

		// Financial
		'business accounting software', 'sales tracking system',
		'financial management tools', 'business analytics platform',
		'transaction management',

		// Technology
		'mobile POS', 'cloud-based business software', 'business mobile app',
		'digital business solutions', 'AI-powered business tools',

		// E-commerce
		'multi-vendor e-commerce platform', 'online store builder',
		'build an online store', 'sell products online',
		'e-commerce software for small businesses', 'inventory management for online stores',

		// SEO and Marketing
		'SEO-friendly e-commerce platform', 'marketing tools for online businesses',
		'digital marketing for small businesses', 'website optimization for sales',

		// User Benefits
		'easy-to-use POS software', 'simplified inventory management',
		'track sales and expenses easily', 'improve business efficiency',
		'save time with automated receipts',

		// Competitive
		'Shopify alternative', 'Square POS competitor', 'WooCommerce for Africa',
		'best e-commerce solution for small businesses',

		// Regional
		'African business software', 'East Africa e-commerce', 'Kenyan business solutions',
		'African digital marketplace', 'Kenya POS system', 'best e-commerce software in Kenya',
		'Nairobi business solutions', 'e-commerce platform for African entrepreneurs',

		// Features
		'automated inventory tracking', 'business reporting tools',
		'multi-currency support', 'secure payment processing',
		'real-time business analytics',

		// Names
		'estore', 'estore.ke', 'estore.africa', 'estore africa', 'estore kenya'
	]

};

export type SiteConfig = typeof siteConfig;
