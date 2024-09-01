'use client';
import {Icons} from '@/components/icons';
import CopyItem from '@/components/shared/copy';
import {Platform, shareToSocialMedia} from '@/components/stores/store';
import {Button} from '@/components/ui/button';
import {Inventory} from '@/models/inventory/inventory';
import {ListCollapse} from 'lucide-react';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import {FC} from 'react';

interface Props {
	hide?: boolean;
	inventory: Inventory;
	isTeam?: boolean;
	teamId?: string;
}

const SeeProductHeader: FC<Props> = ({hide, inventory, isTeam, teamId}) => {
	const {theme} = useTheme();
	return (
		<div className='flex items-center gap-4'>
			<h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
				{inventory.name}
			</h1>
			<div className='ml-auto sm:ml-0'>
				<div className='flex flex-row gap-4'>
					<Icons.whatsapp
						className='h-5 w-5'
						onClick={() => {
							shareToSocialMedia(
								Platform.whatsapp,
								`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${inventory.name}`
							);
						}}
					/>
					<Icons.faceBook
						className='h-5 w-5'
						onClick={() => {
							shareToSocialMedia(
								Platform.facebook,
								`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${inventory.name}`
							);
						}}
					/>

					<Icons.twitter
						className='h-5 w-5'
						color={theme}
						onClick={() =>
							shareToSocialMedia(
								Platform.twitter,
								`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${inventory.name}`
							)
						}
					/>

					<CopyItem copy={`${process.env.NEXT_PUBLIC_DOMAIN}/shop/item/${inventory.store.name}/${inventory.name}`} />
				</div>
			</div>
			{!hide && (
				<div className='hidden items-center gap-2 md:ml-auto md:flex'>
					<Link
						href={isTeam ? `/teams/inventory/variants/${teamId}/${inventory.id}` : `/inventory/variants/${inventory.id}`}>
						<Button size='sm' type='button' variant='link'>
							<ListCollapse className='h-4 w-4 mr-2' /> View Variants
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default SeeProductHeader;
