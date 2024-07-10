/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'receipts-ke.s3.amazonaws.com',
				port: '',
				pathname: '/logo/**',
			},

			{
				protocol: 'https',
				hostname: 'receipts-ke.s3.amazonaws.com',
				port: '',
				pathname: '/receipts/**',
			},

			{
				protocol: 'https',
				hostname: 'receipts-ke.s3.amazonaws.com',
				port: '',
				pathname: '/qrcode/**',
			},

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
			{
				protocol: 'https',
				hostname: 'receipts-ke.s3.amazonaws.com',
				port: '',
				pathname: '/inventory/**',
			},
		],
	},

	transpilePackages: ['@radix-ui/react-alert-dialog'],
	output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
};

module.exports = nextConfig;
