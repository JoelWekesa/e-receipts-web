'use client';
import {Category} from '@/models/inventory/category';
import {Store} from '@/models/store';
import Link from 'next/link';
import {FC} from 'react';
import {Button} from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';

interface Props {
	categories: Category[];
	store: Store;
}

const StoreFrontCategoriesNav: FC<Props> = ({categories, store}) => {
	const pathname = usePathname();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<div
						className={cn(
							'transition-colors hover:text-foreground/80',
							pathname === `/shop/${store.name}/categories` ? 'text-foreground' : 'text-foreground/60'
						)}>
						Categories
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{store.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>Browse by categories</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{categories.map((category) => (
						<Link href={`/shop/category/${category.id}`} key={category.id}>
							<DropdownMenuItem>{category.name}</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StoreFrontCategoriesNav;
