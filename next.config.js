/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'e-receipts-kenya.s3.amazonaws.com',
				port: '',
				pathname: '/logo/**',
			},

			{
				protocol: 'https',
				hostname: 'e-receipts-kenya.s3.amazonaws.com',
				port: '',
				pathname: '/receipts/**',
			},

			{
				protocol: 'https',
				hostname: 'e-receipts-kenya.s3.amazonaws.com',
				port: '',
				pathname: '/qrcode/**',
			},
		],
	},
};

module.exports = nextConfig;
