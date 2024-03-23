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
		],
	},
};

module.exports = nextConfig;
