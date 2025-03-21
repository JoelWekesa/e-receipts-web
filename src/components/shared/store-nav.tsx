'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {Icons} from '@/components/icons';
import {siteConfig} from '@/config/site';
import {cn} from '@/lib/utils';
import {FC} from 'react';

interface Props {
	storeId: string;
}

export const StoreNavSite: FC<Props> = ({storeId}) => {
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
					href={`/store/dashboard/${storeId}`}
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname === `/store/dashboard/${storeId}` ? 'text-foreground' : 'text-foreground/60'
					)}>
					Dashboard
				</Link>
				<Link
					href={`/receipts/create/${storeId}`}
					className={cn(
						'transition-colors hover:text-foreground/80',
						pathname === `/receipts/create/${storeId}` ? 'text-foreground' : 'text-foreground/60'
					)}>
					Create Receipt
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
