'use client';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Total} from '@/models/inventory/total';
import currencyFormat from '@/utils/currency';
import {MoveRight} from 'lucide-react';
import Link from 'next/link';
import React, {FC} from 'react';

interface Props {
	total: Total;
	title: string;
	storeId: string;
	isTeam?: boolean;
	teamId?: string;
}

const InventoryValue: FC<Props> = ({total: tot, title, storeId, isTeam, teamId}) => {
	return (
		<div className='my-1 flex flex-col gap-2'>
			<div className='my-1'>
				<p className='my-3'>
					Introducing our sleek, streamlined dashboard: Your one-stop destination for all your business digital receipts.
				</p>
				<Separator />
			</div>
			<div className='my-1 flex flex-col gap-2'>
				<div className='flex flex-row gap-2'>
					<span>{title} </span>
					<span className='text-green-500'>{currencyFormat.format(tot?.total)}</span>
				</div>
				<Link href={isTeam ? `/teams/inventory/${teamId}` : `/inventory/${storeId}`}>
					<Button size='sm'>
						Manage Inventory <MoveRight className='w-4 h-4 ml-2' />
					</Button>
				</Link>
			</div>
		</div>
	);
};

type AllInventoryValueProps = Omit<Props, 'storeId'>;

export const AllInventoryValue: FC<AllInventoryValueProps> = ({total: tot, title}) => {
	return (
		<div className='my-1 flex flex-col gap-2'>
			<div className='my-1'>
				<p className='my-3'>
					Introducing our sleek, streamlined dashboard: Your one-stop destination for all your business digital receipts.
				</p>
				<Separator />
			</div>
			<div className='my-1 flex flex-row gap-2'>
				<>
					<span>{title} </span>
					<span className='text-green-500'>{currencyFormat.format(tot?.total)}</span>
				</>
			</div>
		</div>
	);
};

export default InventoryValue;
