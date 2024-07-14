'use client';
import Link from 'next/link';

import {cn} from '@/lib/utils';
import {usePathname} from 'next/navigation';

export function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
	const pathName = usePathname();
	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
			<Link
				href='/dashboard'
				className={`text-sm font-medium ${
					pathName === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Overview
			</Link>
			<Link
				href='/clients'
				className={`text-sm font-medium ${
					pathName === '/clients' ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Clients
			</Link>
			<Link
				href='/myteams'
				className={`text-sm font-medium ${
					pathName === '/myteams' ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				My Teams
			</Link>
		</nav>
	);
}
