'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Icons} from '@/components/icons';
import {siteConfig} from '@/config/site';
import {cn} from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {FC} from 'react';

interface Props {
	storeId: string;
}

export const MainNav: FC<Props> = ({storeId}) => {
	const pathname = usePathname();

	return (
		<div className='mr-4 hidden md:flex'>
			<Link href='/' className='mr-6 flex items-center space-x-2'>
				<Icons.logo className='h-6 w-6' />
				<span
					className={cn(
						'hidden font-bold sm:inline-block transition-colors hover:text-foreground/80',
						pathname === '/' ? 'text-foreground' : 'text-foreground/60'
					)}>
					{siteConfig.name}
				</span>
			</Link>
			<nav className='flex items-center gap-6 text-sm'>
				<Link
					href='/dashboard'
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname === '/dashboard' ? 'text-foreground' : 'text-foreground/60'
					)}>
					Dashboard
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<p
							className={cn(
								'transition-colors hover:text-foreground/80 cursor-pointer',
								pathname?.startsWith('/stores') ? 'text-foreground' : 'text-foreground/60'
							)}>
							Stores
						</p>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56' align='end' forceMount>
						<Link href='/stores/add'>
							<DropdownMenuItem className='font-normal cursor-pointer'>Create</DropdownMenuItem>
						</Link>

						<DropdownMenuSeparator />
						<Link href='/stores/all'>
							<DropdownMenuItem className='font-normal cursor-pointer'>View All</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<p
							className={cn(
								'transition-colors hover:text-foreground/80 cursor-pointer',
								pathname?.startsWith('/receipts/create') ? 'text-foreground' : 'text-foreground/60'
							)}>
							Create Receipt
						</p>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-56' align='end' forceMount>
						<Link href={`/receipts/create/${storeId}`}>
							<DropdownMenuItem className='font-normal cursor-pointer'>Default</DropdownMenuItem>
						</Link>

						<DropdownMenuSeparator />
						<Link href='/stores/all'>
							<DropdownMenuItem className='font-normal cursor-pointer'>Select Store</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
				<Link
					href='/settings'
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname?.startsWith('/settings') ? 'text-foreground' : 'text-foreground/60'
					)}>
					Settings
				</Link>
				<Link
					href={siteConfig.links.github}
					className={cn('hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block')}>
					GitHub
				</Link>
			</nav>
		</div>
	);
};
