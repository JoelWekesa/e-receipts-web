'use client';
import {Separator} from '@/components/ui/separator';
import {Total} from '@/models/inventory/total';
import currencyFormat from '@/utils/currency';
import React, {FC} from 'react';

interface Props {
	total: Total;
	title: string;
}

const InventoryValue: FC<Props> = ({total: tot, title}) => {
	return (
		<div className='my-1 flex flex-col gap-2'>
			<div className='my-1'>
				<p className='my-3'>
					Introducing our sleek, streamlined dashboard: Your one-stop destination for all your business digital receipts.
				</p>
				<Separator />
			</div>
			<div className='my-1'>
				<span>{title} </span>
				<span className='text-green-500'>{currencyFormat.format(tot?.total)}</span>
			</div>
		</div>
	);
};

export default InventoryValue;
