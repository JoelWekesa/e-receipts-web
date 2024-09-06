'use client';
import {Edit, Eye, Trash2} from 'lucide-react';

import {Icons} from '@/components/icons';
import CopyItem from '@/components/shared/copy';
import {Platform, shareToSocialMedia} from '@/components/stores/store';
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
import {Inventory} from '@/models/inventory/inventory';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import {FC, ReactNode, useState} from 'react';
import DeleteInventory from './delete';

interface Drop {
	label: string;
	inventory: Inventory;
	isTeam?: boolean;
	teamId?: string;
}

const InventoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({
	drop: {label, inventory, isTeam, teamId},
	children,
}) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const {theme} = useTheme();

	return (
		<Dialog open={open}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>{label} </DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<Link href={isTeam ? `/teams/inventory/item/${teamId}/${inventory.id}` : `/inventory/item/${inventory.id}`}>
							<DropdownMenuItem className='cursor-pointer'>
								<Eye className='mr-2 h-4 w-4' />
								<span>View Item </span>
							</DropdownMenuItem>
						</Link>
						{!teamId && (
							<Link href={isTeam ? `/teams/inventory/edit/${teamId}/${inventory.id}` : `/inventory/edit/${inventory.id}`}>
								<DropdownMenuItem className='cursor-pointer'>
									<Edit className='mr-2 h-4 w-4' />
									<span>Edit Item </span>
								</DropdownMenuItem>
							</Link>
						)}

						<DropdownMenuItem className='cursor-pointer'>
							<div className='flex flex-col gap-4'>
								<div className='flex flex-row gap-2'>
									<span>Share To</span>
								</div>

								<div className='flex flex-row gap-4'>
									<Icons.whatsapp
										className='h-5 w-5'
										onClick={() => {
											shareToSocialMedia(
												Platform.whatsapp,
												`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${encodeURIComponent(
													`${inventory.name}`
												)}`
											);
										}}
									/>
									<Icons.faceBook
										className='h-5 w-5'
										onClick={() => {
											shareToSocialMedia(
												Platform.facebook,
												`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${encodeURIComponent(
													`${inventory.name}`
												)}`
											);
										}}
									/>

									<Icons.twitter
										className='h-5 w-5'
										color={theme}
										onClick={() =>
											shareToSocialMedia(
												Platform.twitter,
												`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${encodeURIComponent(
													`${inventory.name}`
												)}`
											)
										}
									/>

									<CopyItem
										copy={`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${encodeURIComponent(
											`${inventory.name}`
										)}`}
									/>
								</div>
							</div>
						</DropdownMenuItem>

						{!teamId && (
							<DropdownMenuItem className='cursor-pointer' onClick={handleClick}>
								<Trash2 className='mr-2 h-4 w-4' color='red' />
								<span>Delete Item </span>
							</DropdownMenuItem>
						)}
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
