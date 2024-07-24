'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {ReceiptItem} from '@/models/receipts/receipt';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown} from 'lucide-react';
import {FC} from 'react';

const ItemsSoldTable: FC<{items: ReceiptItem[]}> = ({items}) => {
	const columns: ColumnDef<ReceiptItem>[] = [
		{
			accessorKey: 'item',
			header: () => <div className='flex'>Item</div>,
			accessorFn: (row) => row.item,
			cell: ({row}) => {
				return <div className='flex'>{row.original.item}</div>;
			},
		},

		{
			accessorKey: 'quantity',
			header: () => {
				return <div className='flex'>Quantity</div>;
			},

			cell: ({row}) => {
				return <div className='flex'>{row.original.quantity}</div>;
			},
		},

		{
			accessorKey: 'price',
			header: () => {
				return <div className='flex'>Each</div>;
			},

			cell: ({row}) => {
				return <div className='flex'>{currencyFormat.format(row.original.price)}</div>;
			},
		},

		{
			accessorKey: 'total',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Total
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},

			cell: ({row}) => {
				const total = row.original.price * row.original.quantity - row.original.discount;

				return <div className='flex'>{currencyFormat.format(total)}</div>;
			},
		},
	];

	return (
		<div className='flex p-3 flex-col'>
			<div className='m-3 p-5 rounded-md border'>
				<DataTable columns={columns} data={items} searchColumn='item' searchPlaceholder='Search by client name' />
				{/* <DeleteDialog open={open} setOpen={handleDeleteDialog} /> */}
			</div>
		</div>
	);
};

export default ItemsSoldTable;
