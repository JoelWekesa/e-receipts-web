import {Viewport} from 'next';

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

interface StoreLayoutProps {
	children: React.ReactNode;
}

export default function AcceptLayout({children}: StoreLayoutProps) {
	return <>{children}</>;
}
