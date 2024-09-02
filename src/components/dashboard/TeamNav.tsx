'use client';
import Link from 'next/link';

import {cn} from '@/lib/utils';
import {usePathname} from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLElement> {
	id: string;
}

export function TeamNav({className, id, ...props}: Props) {
	const pathName = usePathname();

	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
			<Link
				href={`/teams/dashboard/${id}`}
				className={`text-sm font-medium ${
					pathName === `/teams/dashboard/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Overview
			</Link>
			<Link
				href={`/teams/clients/${id}`}
				className={`text-sm font-medium ${
					pathName === `/teams/clients/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Clients
			</Link>
			<Link
				href={`/teams/inventory/${id}`}
				className={`text-sm font-medium ${
					pathName === `/teams/inventory/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Inventory
			</Link>

			<Link
				href={`/teams/orders/${id}`}
				className={`text-sm font-medium ${
					pathName === `/teams/orders/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Orders
			</Link>
		</nav>
	);
}
