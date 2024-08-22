'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {OrderStatus, StoreOrder} from '@/models/orders/orders-store';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {FC} from 'react';
import StoreOrdersDropDown from './dropdown';
import useOrders from '@/services/orders/get-orders';
import currencyFormat from '@/utils/currency';

const columns: ColumnDef<StoreOrder>[] = [
	{
		accessorKey: 'customer',
		header: ({column}) => {
			return (
				<div className='flex justify-start'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Customer
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => <div className='flex justify-start'>{row.original.customer}</div>,
	},

	{
		accessorKey: 'date',
		header: ({column}) => {
			return (
				<div className='flex justify-start '>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Order Date
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className='flex justify-start '>{dayjs(row.original.createdAt).format('ddd DD MMM YYYY')}</div>;
		},
	},

	{
		accessorKey: 'amount',
		header: ({column}) => {
			return (
				<div className='flex justify-start '>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Amount
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className='flex justify-start '>{currencyFormat.format(row.original.total)}</div>;
		},
	},

	{
		accessorKey: 'action',
		header: '',
		cell: ({row}) => {
			return (
				<div className='flex flex-row gap-2'>
					<StoreOrdersDropDown
						drop={{
							label: 'Actions',
							order: row.original,
						}}>
						<Button variant='outline' size='icon'>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</StoreOrdersDropDown>
				</div>
			);
		},
	},
];

interface StoreOrdersTableProps {
	orders: StoreOrder[];
	status: OrderStatus;
	storeId: string;
}

const StoreOrdersTable: FC<StoreOrdersTableProps> = ({orders, status, storeId}) => {
	const {data} = useOrders({storeId, status, orders});

	return (
		<div className='flex flex-col my-5'>
			<div>
				<DataTable columns={columns} data={data} searchColumn='customer' searchPlaceholder='Search customer name' black />
			</div>
		</div>
	);
};

export default StoreOrdersTable;
