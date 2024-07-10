'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Inventory } from '@/models/inventory/inventory';
import { ListCollapse } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
	hide?: boolean;
	inventory: Inventory;
}

const SeeProductHeader: FC<Props> = ({hide, inventory}) => {
	return (
		<div className='flex items-center gap-4'>
			<h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
				{inventory.name}
			</h1>
			<Badge variant='outline' className='ml-auto sm:ml-0'>
				New
			</Badge>
			{!hide && (
				<div className='hidden items-center gap-2 md:ml-auto md:flex'>
					<Link href={`/inventory/variants/${inventory.id}`}>
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
