'use client';
import {Edit, Trash2} from 'lucide-react';

import {Dialog, DialogContent} from '@/components/ui/dialog';
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
import Link from 'next/link';
import {FC, ReactNode, useState} from 'react';
import DeleteVariant from './delete-variant';

interface Drop {
	label: string;
	variant: Variant;
	isTeam?: boolean;
	teamId?: string;
}

const SeeInventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({
	drop: {label, variant, isTeam, teamId},
	children,
}) => {
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
						<Link
							href={
								isTeam ? `/teams/inventory/variants/edit/${teamId}/${variant.id}` : `/inventory/variants/edit/${variant.id}`
							}>
							<DropdownMenuItem className='cursor-pointer'>
								<Edit className='mr-2 h-4 w-4' />
								<span>Edit Variant </span>
							</DropdownMenuItem>
						</Link>

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
