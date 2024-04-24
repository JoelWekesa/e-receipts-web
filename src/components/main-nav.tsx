'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Icons} from '@/components/icons';
import {siteConfig} from '@/config/site';
import {cn} from '@/lib/utils';

export function MainNav() {
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
					href='/stores/sales'
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname === '/stores/sales' ? 'text-foreground' : 'text-foreground/60'
					)}>
					Dashboard
				</Link>
				<Link
					href='/stores/all'
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname?.startsWith('/stores/all') ? 'text-foreground' : 'text-foreground/60'
					)}>
					Stores
				</Link>
				<Link
					href='/themes'
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname?.startsWith('/receipts/create') ? 'text-foreground' : 'text-foreground/60'
					)}>
					New Receipt
				</Link>
				<Link
					href='/examples'
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname?.startsWith('/examples') ? 'text-foreground' : 'text-foreground/60'
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
}
