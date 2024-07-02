'use client';
import {CreditCard, Settings, ShoppingCart, User} from 'lucide-react';

import {storeAtom} from '@/atoms/store';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Store} from '@/models/store';
import {useAtom} from 'jotai';
import Link from 'next/link';
import {FC, ReactNode} from 'react';
import {SheetTrigger} from '../ui/sheet';

interface Drop {
	label: string;
	store: Store;
}

const StoreButtonDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	const [_, setStore] = useAtom(storeAtom);

	const handleClick = () => {
		setStore(drop.store);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`/receipts/create?id=${drop.store.id}`}>
						<DropdownMenuItem>
							<User className='mr-2 h-4 w-4' />
							<span>Create Receipt</span>
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
					<SheetTrigger asChild>
						<DropdownMenuItem onClick={handleClick}>
							<CreditCard className='mr-2 h-4 w-4' />
							<span>View Store</span>
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
						</DropdownMenuItem>
					</SheetTrigger>
					<Link href={`/stores/update?id=${drop.store.id}`}>
						<DropdownMenuItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Edit Store</span>
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
					<Link href={`/inventory/${drop.store.id}`}>
						<DropdownMenuItem>
							<ShoppingCart className='mr-2 h-4 w-4' />
							<span>Manage Inventory</span>
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StoreButtonDropDown;
