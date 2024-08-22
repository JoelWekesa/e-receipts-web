import {options} from '@/app/api/auth/[...nextauth]/options';
import ShippingProvider from '@/providers/shipping';
import getShipping from '@/services/page/shipping/get';
import {Viewport} from 'next';
import {getServerSession} from 'next-auth';
import {FC, ReactNode} from 'react';

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

const StoreClientsLayout: FC<{
	children: ReactNode;
	// params: {
	// 	name: string;
	// 	checkout: string;
	// };
}> = async ({children}) => {
	// const {name} = params;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [shipping] = await Promise.all([getShipping({token})]);

	return <ShippingProvider shipping={shipping}>{children}</ShippingProvider>;
};

export default StoreClientsLayout;
