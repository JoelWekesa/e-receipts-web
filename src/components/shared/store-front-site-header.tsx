'use client';
import {MobileNav} from '@/components/mobile-nav';
import {Category} from '@/models/inventory/category';
import {Store} from '@/models/store';
import {FC} from 'react';
import UserNav from '../dashboard/UserNav';
import {ModeToggle} from '../mode-toggle';
import StoreNavigationMenu from '../storefront/nav-menu/store-nav-menu';
import {SearchInput} from '../storefront/search/input';
import {CartNavItem} from './cart/cart-icon';

interface Props {
	store: Store;
	categories: Category[];
}

export const StoreFrontSiteHeader: FC<Props> = ({store, categories}) => {
	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 max-w-screen-2xl items-center'>
				<MobileNav />
				<StoreNavigationMenu store={store} categories={categories} />
				<div className='flex flex-1'>
					<div className='hidden md:block flex-1'>
						<nav className='flex items-center w-full px-7'>
							<SearchInput placeholder='Search for products' shop={store.name} />
							{/* <Button variant='ghost' size='sm' className='bg-neutral-100 dark:bg-neutral-900 w-full'>
								<Search className='h-4 w-4 mr-2' />
								<div className='sm:w-full text-start '>Search Products...</div>
							</Button> */}
						</nav>
					</div>
				</div>
				<div className='mx-2'>
					<CartNavItem />
				</div>

				<div className='mx-2'>
					<ModeToggle />
				</div>
				<div className='mx-2'>
					<UserNav />
				</div>
			</div>
		</header>
	);
};
