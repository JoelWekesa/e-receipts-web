'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {CashTopUp} from '@/models/floats/cash-topups';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown} from 'lucide-react';
import {FC} from 'react';

const columns: ColumnDef<CashTopUp>[] = [
	{
		accessorKey: 'name',
		accessorFn: (row) => row.createdBy.name,
		header: ({column}) => {
			return (
				<div className=''>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Name
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => <div className='pl-3'>{row.original.createdBy.name}</div>,
	},

	{
		accessorKey: 'email',
		accessorFn: (row) => row.createdBy?.email,
		header: ({column}) => {
			return (
				<div className=''>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Email
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => <div className='pl-3'>{row.original.createdBy?.email || 'N/A'}</div>,
	},

	{
		accessorKey: 'phone',
		accessorFn: (row) => row.createdBy?.phone,
		header: ({column}) => {
			return (
				<div className=''>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Phone
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => <div className='pl-3'>{row.original.createdBy?.phone || 'N/A'}</div>,
	},

	{
		accessorKey: 'amount',
		header: ({column}) => {
			return (
				<div className=' '>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Amount
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className='pl-3 '>{currencyFormat.format(row.original.amount)}</div>;
		},
	},

	{
		accessorKey: 'date',
		header: ({column}) => {
			return (
				<div className='flex  items-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Transaction Time
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className='pl-3'>{dayjs(row.original.createdAt).format('ddd DD MMM YYYY HH:mm')}</div>;
		},
	},
];

interface StoreCashTopUpsProps {
	topUps: CashTopUp[];
}

const StoreCashTopUps: FC<StoreCashTopUpsProps> = ({topUps}) => {
	return (
		<div className='flex flex-col my-5 gap-4'>
			<div>
				<DataTable columns={columns} data={topUps} searchColumn='name' searchPlaceholder='Search by name' black />
			</div>
		</div>
	);
};

export default StoreCashTopUps;
