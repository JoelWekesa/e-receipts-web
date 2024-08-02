'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Icons} from '@/components/icons';
import {cn} from '@/lib/utils';
import {Category} from '@/models/inventory/category';
import {Store} from '@/models/store';
import {FC} from 'react';
import StoreFrontCategoriesNav from './store-front-nav-categories';

interface Props {
	store: Store;
	categories: Category[];
}

export const StoreFrontNavSite: FC<Props> = ({store, categories}) => {
	const pathname = usePathname();

	return (
		<div className='mr-4 hidden md:flex'>
			<Link href='#' className='mr-6 flex items-center space-x-2'>
				<Icons.store className='h-6 w-6' src={store.logo} alt='logo' priority />
				<span
					className={cn(
						'hidden font-bold sm:inline-block transition-colors hover:text-foreground/80',
						pathname === '#' ? 'text-foreground' : 'text-foreground/60'
					)}>
					{store.displayName}
				</span>
			</Link>
			<nav className='flex items-center gap-8 text-sm'>
				<Link
					href='#'
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname === `/shop/${store.name}` ? 'text-foreground' : 'text-foreground/60'
					)}>
					All
				</Link>

				<StoreFrontCategoriesNav store={store} categories={categories} />
			</nav>
		</div>
	);
};
