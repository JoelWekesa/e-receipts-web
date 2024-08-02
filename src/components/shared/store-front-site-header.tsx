'use client';
import {MobileNav} from '@/components/mobile-nav';
import {Category} from '@/models/inventory/category';
import {Store} from '@/models/store';
import {Search} from 'lucide-react';
import {FC} from 'react';
import UserNav from '../dashboard/UserNav';
import {ModeToggle} from '../mode-toggle';
import {Button} from '../ui/button';
import {CartNavItem} from './cart/cart-icon';
import {StoreFrontNavSite} from './store-front-nav';

interface Props {
	store: Store;
	categories: Category[];
}

export const StoreFrontSiteHeader: FC<Props> = ({store, categories}) => {
	return (
		<header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container flex h-14 max-w-screen-2xl items-center'>
				<StoreFrontNavSite store={store} categories={categories} />
				<MobileNav />
				<div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
					<nav className='flex items-center'>
						<div className='justify-center'>
							<Button variant='ghost' size='sm' className='bg-neutral-100 dark:bg-neutral-900'>
								<Search className='h-4 w-4 mr-2' />
								<div className='sm:w-[300px] text-start'>Search Products...</div>
							</Button>
						</div>
					</nav>
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
