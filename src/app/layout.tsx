import {Viewport} from 'next';
import '../styles/globals.css';

import {Analytics} from '@/components/analytics';
import {ThemeProvider} from '@/components/providers';
import {SiteFooter} from '@/components/site-footer';
import {TailwindIndicator} from '@/components/tailwind-indicator';
import {ThemeSwitcher} from '@/components/theme-switcher';
import {Toaster as NewYorkSonner} from '@/components/ui/sonner';
import {Toaster as DefaultToaster, Toaster as NewYorkToaster, Toaster} from '@/components/ui/toaster';
import {fontSans} from '@/lib/fonts';
import {cn} from '@/lib/utils';
import NextAuthProvider from '@/providers/next-auth';
import ReactQueryProvider from '@/providers/react-query';
import {getCookies, setCookie} from 'cookies-next';
import {Provider} from 'jotai';
import {v4 as uuidv4} from 'uuid';
import IdleTime from '@/providers/idle-time';

export const viewport: Viewport = {
	themeColor: [
		{media: '(prefers-color-scheme: light)', color: 'white'},
		{media: '(prefers-color-scheme: dark)', color: 'black'},
	],
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({children}: RootLayoutProps) {
	const cookies = await getCookies();

	if (!cookies?.cartId) {
		const cartId = 'cart-' + uuidv4();
		await setCookie('cartId', cartId, {
			maxAge: 60 * 60 * 24 * 30,
		});
	}

	return (
		<NextAuthProvider>
			<IdleTime>
				<Provider>
					<ReactQueryProvider>
						<html lang='en' suppressHydrationWarning>
							<head />
							<body className={cn('min-h-screen bg-background font-sans antialiased overflow-auto', fontSans.className)}>
								<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
									<div vaul-drawer-wrapper=''>
										<div className='relative flex min-h-screen flex-col bg-background'>
											{/* <SiteHeader /> */}
											<main className='flex-1'>{children}</main>
											<Toaster />
											<SiteFooter />
										</div>
									</div>
									<TailwindIndicator />
									<ThemeSwitcher />
									<Analytics />
									<NewYorkToaster />
									<DefaultToaster />
									<NewYorkSonner />
								</ThemeProvider>
							</body>
						</html>
					</ReactQueryProvider>
				</Provider>
			</IdleTime>
		</NextAuthProvider>
	);
}
