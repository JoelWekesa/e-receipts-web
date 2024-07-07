'use client';
import {Edit, Trash2} from 'lucide-react';

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
import {FC, ReactNode} from 'react';
import {useAtom} from 'jotai';
import inventoryAtom from '@/atoms/inventory/inventory';

interface Drop {
	label: string;
	inventory: Inventory;
}

const InventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop: {label, inventory}, children}) => {
	const [_, setInventory] = useAtom(inventoryAtom);

	const handleEdit = () => {
		setInventory({
			inventory,
			path: 'edit',
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{label} </DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer' onClick={handleEdit}>
						<Edit className='mr-2 h-4 w-4' />
						<span>Edit Item </span>
					</DropdownMenuItem>

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
