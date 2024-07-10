'use client';
import {Edit, Eye, Trash2} from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Inventory} from '@/models/inventory/inventory';
import Link from 'next/link';
import {FC, ReactNode, useState} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import DeleteInventory from './delete';

interface Drop {
	label: string;
	inventory: Inventory;
}

const InventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop: {label, inventory}, children}) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<Dialog open={open}>
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

						<DropdownMenuItem className='cursor-pointer' onClick={handleClick}>
							<Trash2 className='mr-2 h-4 w-4' color='red' />
							<span>Delete Item </span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent className='sm:max-w-[425px]'>
				<DeleteInventory inventory={inventory} handleClick={handleClick} />
			</DialogContent>
		</Dialog>
	);
};

export default InventoryDropDown;
