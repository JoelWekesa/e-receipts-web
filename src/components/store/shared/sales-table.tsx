'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Receipt} from '@/models/receipts/receipt';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown, Eye} from 'lucide-react';
import Link from 'next/link';
import {FC, useMemo} from 'react';

interface Item {
	client: string;
	phone: string;
	amount: number;
	date: Date;
	receipt: Receipt;
}

interface Props {
	sales: Receipt[];
	isTeam?: boolean;
	teamId?: string;
	storeId?: string;
}

const StoreSalesTable: FC<Props> = ({sales, isTeam, teamId, storeId}) => {
	const items: Item[] = useMemo(
		() =>
			sales.map((receipt) => ({
				client: receipt.name,
				phone: receipt.phone,
				amount: receipt.Payment[0].mpesa + receipt.Payment[0].cash,
				date: receipt.createdAt,
				receipt,
			})),
		[sales]
	);

	const columns: ColumnDef<Item>[] = [
		{
			accessorKey: 'client',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Client
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
		},

		{
			accessorKey: 'phone',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Phone
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
		},

		{
			accessorKey: 'amount',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Amount
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({row}) => {
				return <div className='flex'>{currencyFormat.format(row.original.amount)}</div>;
			},
		},

		{
			accessorKey: 'date',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Date
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
			cell: ({row}) => {
				return <div className='flex'>{dayjs(row.original.date).format('ddd DD MMMM YYYY')}</div>;
			},
		},

		{
			accessorKey: 'receipt',
			header: '',
			cell: ({row}) => {
				return (
					<div className='flex flex-row gap-2'>
						<Link
							href={
								isTeam
									? `/teams/receipt/${teamId}/${storeId}/${row.original.receipt.id}`
									: `/receipts/receipt/${row.original.receipt.id}`
							}>
							<Button size='sm'>
								<Eye className='mr-2 h-4 w-4' />
								View
							</Button>
						</Link>
					</div>
				);
			},
		},
	];

	return (
		<div className='flex p-3 flex-col'>
			<div className='m-3 p-5 rounded-md border'>
				<DataTable columns={columns} data={items} searchColumn='client' searchPlaceholder='Search by client name' />
				{/* <DeleteDialog open={open} setOpen={handleDeleteDialog} /> */}
			</div>
		</div>
	);
};

export default StoreSalesTable;
