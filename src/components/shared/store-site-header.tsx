'use client';

import {CommandMenu} from '@/components/command-menu';
import {Icons} from '@/components/icons';
import {ModeToggle} from '@/components/mode-toggle';
import {siteConfig} from '@/config/site';
import {cn} from '@/lib/utils';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import {FC} from 'react';
import UserNav from '../dashboard/UserNav';
import {buttonVariants} from '../ui/button';
import StoreMobileNav from '../ui/mobilenav/store';
import {StoreNavSite} from './store-nav';

interface Props {
	show?: boolean;
	storeId: string;
}

export const StoreSiteHeader: FC<Props> = ({show, storeId}) => {
	const {theme} = useTheme();

	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 max-w-screen-2xl items-center'>
				<StoreNavSite storeId={storeId} />
				<StoreMobileNav storeId={storeId} />
				<div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
					{show && (
						<div className='w-full flex-1 md:w-auto md:flex-none'>
							<CommandMenu />
						</div>
					)}
					<nav className='flex items-center'>
						<Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
							<div
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'w-9 px-0'
								)}>
								<Icons.gitHub className='h-4 w-4' />
								<span className='sr-only'>GitHub</span>
							</div>
						</Link>
						<Link href={siteConfig.links.twitter} target='_blank' rel='noreferrer'>
							<div
								className={cn(
									buttonVariants({
										variant: 'ghost',
									}),
									'w-9 px-0'
								)}>
								<Icons.twitter className='h-3 w-3 fill-current' color={theme} />
								<span className='sr-only'>Twitter</span>
							</div>
						</Link>
						<ModeToggle />
						<div className='mx-2'>
							<UserNav />
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};
