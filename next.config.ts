// const withPlaiceholder = require('@plaiceholder/next');
import withPlaiceholder from '@plaiceholder/next';
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
	// output: 'standalone',
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

			{
				protocol: 'https',
				hostname: 'receipts-ke.s3.amazonaws.com',
				port: '',
				pathname: '/evidence/**',
			},

			{
				protocol: 'https',
				hostname: 'receipts-ke.s3.amazonaws.com',
				port: '',
				pathname: '/dp/**',
			},
		],
	},

	transpilePackages: ['@radix-ui/react-alert-dialog'],
	output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
};



export default withPlaiceholder(nextConfig);
