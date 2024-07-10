'use client';
import { Edit, Eye, Trash2 } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Inventory } from '@/models/inventory/inventory';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface Drop {
	label: string;
	inventory: Inventory;
}

const InventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop: {label, inventory}, children}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{label} </DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`/inventory/item/${inventory.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<Eye className='mr-2 h-4 w-4' />
							<span>View Item </span>
						</DropdownMenuItem>
					</Link>
					<Link href={`/inventory/edit/${inventory.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<Edit className='mr-2 h-4 w-4' />
							<span>Edit Item </span>
						</DropdownMenuItem>
					</Link>

					<DropdownMenuItem className='cursor-pointer'>
						<Trash2 className='mr-2 h-4 w-4' color='red' />
						<span>Delete Item </span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default InventoryDropDown;
