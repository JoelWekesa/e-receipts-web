'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {StoreFloat} from '@/models/floats/store';
import {Transaction} from '@/models/floats/transactions';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown, EyeIcon} from 'lucide-react';
import {FC} from 'react';
import FloatBalance from '../float-balance';
import {Badge} from '@/components/ui/badge';
import Link from 'next/link';
import useTransactions from '@/services/float/transactions';

const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'name',
		accessorFn: (row) => row.user.name,
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

		cell: ({row}) => <div className='pl-3'>{row.original.user.name}</div>,
	},

	{
		accessorKey: 'email',
		accessorFn: (row) => row.user?.email,
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

		cell: ({row}) => <div className='pl-3'>{row.original.user?.email || 'N/A'}</div>,
	},

	{
		accessorKey: 'phone',
		accessorFn: (row) => row.user?.phone,
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

		cell: ({row}) => <div className='pl-3'>{row.original.user?.phone || 'N/A'}</div>,
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
		accessorKey: 'status',
		header: ({column}) => {
			return (
				<div className=' '>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Status
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return (
				<div className='pl-3 '>
					{row.original.approved && <Badge className='bg-green-600 rounded-xl text-white'>Approved</Badge>}
					{row.original.rejected && (
						<Badge variant='destructive' className='rounded-xl'>
							Rejected
						</Badge>
					)}
					{!row.original.approved && !row.original.rejected && <Badge className='rounded-xl'>Pending</Badge>}
				</div>
			);
		},
	},

	{
		accessorKey: 'date',
		header: ({column}) => {
			return (
				<div className='flex  items-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Last Updated
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className='pl-3'>{dayjs(row.original.updatedAt).format('ddd DD MMM YYYY HH:mm')}</div>;
		},
	},

	{
		accessorKey: 'date',
		header: () => {
			return <></>;
		},
		cell: ({row}) => {
			return (
				<div className='pl-3'>
					<Link href={`/store/float/transaction/${row.original.id}`}>
						<Button variant='link' size='sm'>
							<EyeIcon className='w-4 h-4 mr-1' />
							View
						</Button>
					</Link>
				</div>
			);
		},
	},
];

interface StoreTransactionsProps {
	transactions: Transaction[];
	storeFloat: StoreFloat | null;
	storeId: string;
}

const StoreTransactionsComponent: FC<StoreTransactionsProps> = ({transactions, storeFloat, storeId}) => {
	const {data} = useTransactions({
		storeId,
		transactions,
	});

	return (
		<div className='flex flex-col my-5 gap-4'>
			{storeFloat && <FloatBalance storeFloat={storeFloat} storeId={storeId} />}
			<div>
				<DataTable columns={columns} data={data} searchColumn='name' searchPlaceholder='Search by name' black />
			</div>
		</div>
	);
};

export default StoreTransactionsComponent;
