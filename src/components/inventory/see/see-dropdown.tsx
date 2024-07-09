'use client';
import {Edit, Trash2} from 'lucide-react';

import {variantAtom} from '@/atoms/inventory/variants';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Variant} from '@/models/inventory/inventory';
import {useAtom} from 'jotai';
import {FC, ReactNode, useState} from 'react';
import inventoryAtom from '@/atoms/inventory/inventory';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import DeleteVariant from './delete-variant';

interface Drop {
	label: string;
	variant: Variant;
}

const SeeInventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop: {label, variant}, children}) => {
	const [_, setVariant] = useAtom(variantAtom);

	const [data, setInventory] = useAtom(inventoryAtom);

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleEdit = () => {
		setInventory({
			inventory: data?.inventory || null,
			path: 'edit-variant',
		});
		setVariant(variant);
	};
	return (
		<Dialog open={open}>
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

						<DropdownMenuItem className='cursor-pointer' onClick={handleClick}>
							<Trash2 className='mr-2 h-4 w-4' color='red' />
							<span>Delete Variant </span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent className='sm:max-w-[425px]'>
				<DeleteVariant variant={variant} handleClick={handleClick} />
			</DialogContent>
		</Dialog>
	);
};

export default SeeInventoryDropDown;
