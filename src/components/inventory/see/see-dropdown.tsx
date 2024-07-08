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
import {FC, ReactNode} from 'react';

interface Drop {
	label: string;
}

const SeeInventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop: {label}, children}) => {
	const handleEdit = () => {};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{label} </DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer' onClick={handleEdit}>
						<Edit className='mr-2 h-4 w-4' />
						<span>Edit Variant </span>
					</DropdownMenuItem>

					<DropdownMenuItem className='cursor-pointer'>
						<Trash2 className='mr-2 h-4 w-4' color='red' />
						<span>Delete Variant </span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SeeInventoryDropDown;
