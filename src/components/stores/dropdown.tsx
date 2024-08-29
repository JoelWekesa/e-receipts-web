'use client';
import {Banknote, Edit, Eye, ListOrdered, ReceiptText, ShoppingCart} from 'lucide-react';

import {storeAtom} from '@/atoms/store';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
					<Link href={`/receipts/create/${drop.store.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<ReceiptText className='mr-2 h-4 w-4' />
							<span>Create Receipt</span>
						</DropdownMenuItem>
					</Link>
					<Link href={`/orders/${drop.store.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<ListOrdered className='mr-2 h-4 w-4' />
							<span>Orders</span>
						</DropdownMenuItem>
					</Link>
					<Link href={`/inventory/${drop.store.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<ShoppingCart className='mr-2 h-4 w-4' />
							<span>Manage Inventory</span>
						</DropdownMenuItem>
					</Link>
					<Link href={`/store/float/${drop.store.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<Banknote className='mr-2 h-4 w-4' />
							<span>Manage Float</span>
						</DropdownMenuItem>
					</Link>
					<SheetTrigger asChild>
						<DropdownMenuItem onClick={handleClick} className='cursor-pointer'>
							<Eye className='mr-2 h-4 w-4' />
							<span>View Store</span>
						</DropdownMenuItem>
					</SheetTrigger>
					<Link href={`/stores/update?id=${drop.store.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<Edit className='mr-2 h-4 w-4' />
							<span>Edit Store</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StoreButtonDropDown;
