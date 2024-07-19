'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Receipt} from '@/models/receipts/receipt';
import useStorePeriodSales from '@/services/store/period-sales';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown} from 'lucide-react';
import {FC, useMemo} from 'react';

interface Item {
	client: string;
	phone: string;
	amount: number;
	date: Date;
}

interface Props {
	period: string;
	storeId: string;
	sales: Receipt[];
}

const StoreSalesTable: FC<Props> = ({sales, period, storeId}) => {
	const {data = []} = useStorePeriodSales({
		period,
		sales,
		storeId,
	});

	const items: Item[] = useMemo(
		() =>
			data.map((receipt) => ({
				client: receipt.name,
				phone: receipt.phone,
				amount: receipt.Payment[0].mpesa + receipt.Payment[0].cash,
				date: receipt.createdAt,
			})),
		[data]
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
