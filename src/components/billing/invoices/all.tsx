'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button, buttonVariants} from '@/components/ui/button';
import {Invoices, InvoiceStatus} from '@/models/billing/invoices';
import useAllInvoices from '@/services/invoices/all';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown, Download, HandCoins} from 'lucide-react';
import Link from 'next/link';
import {FC} from 'react';

const columns: ColumnDef<Invoices>[] = [
	{
		accessorKey: 'id',
		header: ({column}) => {
			return (
				<div className=''>
					Invoice #
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} size='icon'>
						<ArrowUpDown className='mx-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => <div className=''>{row.original.id}</div>,
	},

	{
		accessorKey: 'issuedAt',
		header: ({column}) => {
			return (
				<div className=' '>
					Issued At
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} size='icon'>
						<ArrowUpDown className='mx-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className=' '>{dayjs(row.original.issuedAt).format('ddd DD MMM YYYY')}</div>;
		},
	},

	{
		accessorKey: 'dueDate',
		header: ({column}) => {
			return (
				<div className=' '>
					Due Date
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} size='icon'>
						<ArrowUpDown className='mx-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className=' '>{dayjs(row.original.dueDate).format('ddd DD MMM YYYY')}</div>;
		},
	},

	{
		accessorKey: 'totalAmount',
		header: ({column}) => {
			return (
				<div className=' '>
					Total Amount
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} size='icon'>
						<ArrowUpDown className='mx-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className=' '>{currencyFormat.format(row.original.totalAmount)}</div>;
		},
	},

	{
		accessorKey: 'status',
		header: ({column}) => {
			return (
				<div className=' '>
					Status
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						<ArrowUpDown className='mx-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return (
				<span
					className={`px-2 py-1 rounded-full text-xs font-semibold ${
						row.original.status === InvoiceStatus.PAID ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
					}`}>
					{row.original.status}
				</span>
			);
		},
	},

	{
		accessorKey: 'action',
		header: '',
		cell: ({row}) => {
			return (
				<div className='flex flex-row gap-2'>
					{row.original.status === InvoiceStatus.PAID ? (
						<Link href={`/pay/invoice/${row.original.id}`} className={buttonVariants({variant: 'default', size: 'sm'})}>
							<Download className='mr-2 h-4 w-4' /> Receipt
						</Link>
					) : (
						<Link href={`/pay/invoice/${row.original.id}`} className={buttonVariants({variant: 'destructive', size: 'sm'})}>
							<HandCoins className='mr-2 h-4 w-4' /> Pay Now
						</Link>
					)}
				</div>
			);
		},
	},
];

interface InvoiceProps {
	invoices: Invoices[];
	token: string;
	userId: string;
}

const InvoicesComponent: FC<{data: InvoiceProps}> = ({data: {invoices, token, userId}}) => {
	const {data = []} = useAllInvoices({token, userId, invoices});

	return (
		<div className='flex flex-col my-5'>
			<div>
				<DataTable
					columns={columns}
					data={data}
					searchColumn='id'
					searchPlaceholder='Search by invoice ID'
					black
					title='Invoices'
					pageSize={100}
				/>
			</div>
		</div>
	);
};

export default InvoicesComponent;
