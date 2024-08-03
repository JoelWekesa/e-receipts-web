'use client';

import Link from 'next/link';
import * as React from 'react';

import {Icons} from '@/components/icons';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {cn} from '@/lib/utils';
import {Category} from '@/models/inventory/inventory';
import {Store} from '@/models/store';
import {usePathname} from 'next/navigation';
import {startCap} from '@/utils/startcap';

interface Props {
	store: Store;
	categories: Category[];
}

const StoreNavigationMenu: React.FC<Props> = ({store, categories}) => {
	const pathname = usePathname();

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href={`/shop/${store.name}`} className='mr-6 flex items-center space-x-2'>
						<Icons.store className='h-6 w-6' src={store.logo} alt='logo' priority />
						<span
							className={cn(
								'hidden font-bold sm:inline-block transition-colors hover:text-foreground/80',
								pathname === `/shop/${store.name}` ? 'text-foreground' : 'text-foreground/60'
							)}>
							{store.displayName}
						</span>
					</Link>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<Link href={`/shop/${store.name}`} className='mr-6 flex items-center space-x-2'>
						<span
							className={cn(
								'hidden font-bold sm:inline-block transition-colors hover:text-foreground/80',
								pathname === `/shop/${store.name}` ? 'text-foreground' : 'text-foreground/60'
							)}>
							All
						</span>
					</Link>
				</NavigationMenuItem>

				<NavigationMenuItem className='hidden md:block'>
					<NavigationMenuTrigger className='bg-inherit'>Categories</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid w-[300px] gap-3 p-4 md:grid-cols-1'>
							{categories.map((category) => (
								<ListItem key={category.id} href={`/shop/${store.name}/${category.name}`}>
									{startCap(category.name)}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({className, title, children, ...props}, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';

export default StoreNavigationMenu;
