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
import Link from 'next/link';
import {FC, ReactNode} from 'react';

interface Drop {
	label: string;
	id: string;
}

const InventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{drop.label} </DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`/receipts/create?id=${drop.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<Edit className='mr-2 h-4 w-4' />
							<span>Edit Item </span>
						</DropdownMenuItem>
					</Link>
					<Link href={`/stores/update?id=${drop.id}`}>
						<DropdownMenuItem className='cursor-pointer'>
							<Trash2 className='mr-2 h-4 w-4' color='red' />
							<span>Delete Item </span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default InventoryDropDown;
