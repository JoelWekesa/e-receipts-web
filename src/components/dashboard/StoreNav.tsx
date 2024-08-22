'use client';
import Link from 'next/link';

import {cn} from '@/lib/utils';
import {usePathname} from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLElement> {
	id: string;
}

export function StoreNav({className, id, ...props}: Props) {
	const pathName = usePathname();
	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
			<Link
				href={`/store/dashboard/${id}`}
				className={`text-sm font-medium ${
					pathName === `/store/dashboard/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Overview
			</Link>
			<Link
				href={`/store/clients/${id}`}
				className={`text-sm font-medium ${
					pathName === `/store/clients/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Clients
			</Link>
			<Link
				href={`/inventory/${id}`}
				className={`text-sm font-medium ${
					pathName === `/inventory/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Inventory
			</Link>
			<Link
				href={`/orders/${id}`}
				className={`text-sm font-medium ${
					pathName === `/orders/${id}` ? 'text-primary' : 'text-muted-foreground'
				} transition-colors hover:text-primary`}>
				Orders
			</Link>
		</nav>
	);
}
