'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {CashStatement} from '@/models/floats/cash-statements';
import useStoreCashStatements from '@/services/statements/cash';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown} from 'lucide-react';
import {FC, useState} from 'react';
import {Badge} from '../ui/badge';
import Balances from '../float/balances';
import {StoreCash, StoreFloat} from '@/models/floats/store';
import {StatementsDatePicker} from './picker';
import {DateRange} from 'react-day-picker';
import * as XLSX from 'xlsx';

export enum TransactionType {
	TopUp = 'Top Up',
	Collect = 'Collect',
	Approval = 'Approval',
	Unknown = 'Unknown',
}

interface User {
	name: string;
	email: string;
	phone: string;
	type: TransactionType;
}

const extractUser = (statement: CashStatement): User => {
	let name = '';
	let email = '';
	let phone = '';
	let type = TransactionType.Unknown;

	switch (true) {
		case statement.cashAtHandTopUp !== null:
			const topUpName = statement.cashAtHandTopUp?.createdBy?.name;
			const topUpEmail = statement.cashAtHandTopUp?.createdBy?.email;
			const topUpPhone = statement.cashAtHandTopUp?.createdBy?.phone;

			name = topUpName || 'N/A';
			email = topUpEmail || 'N/A';
			phone = topUpPhone || 'N/A';
			type = TransactionType.TopUp;

			return {name, email, phone, type};

		case statement.cashAtHandTransaction !== null:
			const transactionName = statement.cashAtHandTransaction.approval.user.name;
			const transactionEmail = statement.cashAtHandTransaction.approval.user.email;
			const transactionPhone = statement.cashAtHandTransaction.approval.user.phone;

			name = transactionName || 'N/A';
			email = transactionEmail || 'N/A';
			phone = transactionPhone || 'N/A';
			type = TransactionType.Approval;

			return {name, email, phone, type};

		case statement.cashWithDrawal !== null:
			const withdrawalName = statement.cashWithDrawal.user?.name;
			const withdrawalEmail = statement.cashWithDrawal.user?.email;
			const withdrawalPhone = statement.cashWithDrawal.user?.phone;

			name = withdrawalName || 'N/A';
			email = withdrawalEmail || 'N/A';
			phone = withdrawalPhone || 'N/A';
			type = TransactionType.Collect;

			return {name, email, phone, type};

		default:
			return {
				name,
				email,
				phone,
				type: TransactionType.Unknown,
			};
	}
};

const columns: ColumnDef<CashStatement>[] = [
	{
		accessorKey: 'name',
		accessorFn: (row) => extractUser(row).name,
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

		cell: ({row}) => <div className='pl-3'>{extractUser(row.original).name}</div>,
	},

	{
		accessorKey: 'email',
		accessorFn: (row) => extractUser(row).email,
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

		cell: ({row}) => <div className='pl-3'>{extractUser(row.original).email}</div>,
	},

	{
		accessorKey: 'phone',
		accessorFn: (row) => extractUser(row).phone,
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

		cell: ({row}) => <div className='pl-3'>{extractUser(row.original).phone}</div>,
	},

	{
		accessorKey: 'transactionType',
		accessorFn: (row) => extractUser(row).type,
		header: ({column}) => {
			return (
				<div className=''>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Type
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => (
			<div className='pl-3'>
				<Badge
					className={`${
						extractUser(row.original).type === TransactionType.Collect ? 'bg-red-500' : 'bg-green-500'
					} text-white`}>
					{extractUser(row.original).type}
				</Badge>
			</div>
		),
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
			return (
				<div className={`pl-3 ${extractUser(row.original).type === TransactionType.Collect && 'text-red-500'}`}>
					{extractUser(row.original).type === TransactionType.Collect
						? currencyFormat.format(row.original.amount * -1)
						: currencyFormat.format(row.original.amount)}
				</div>
			);
		},
	},

	{
		accessorKey: 'balance',
		header: ({column}) => {
			return (
				<div className=' '>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Balance
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row}) => {
			return <div className='pl-3 '>{currencyFormat.format(row.original.balance)}</div>;
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

interface StoreCashStatements {
	statements: CashStatement[];
	storeId: string;
	token: string;
	storeFloat: StoreFloat | null;
	storeCash: StoreCash | null;
	team?: boolean;
}

const StoreCashStatementsComponent: FC<StoreCashStatements> = ({
	statements,
	storeId,
	token,
	storeFloat,
	storeCash,
	team,
}) => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(dayjs().startOf('month').startOf('day').toDate()),
		to: new Date(dayjs().endOf('month').endOf('day').toDate()),
	});

	const {data = []} = useStoreCashStatements({
		statements,
		storeId,
		token,
		startDate: dayjs(date?.from).format('YYYY-MM-DD'),
		endDate: dayjs(date?.to).format('YYYY-MM-DD'),
	});

	const handleDownload = () => {
		const toDownload = data.map((item) => ({
			Name: extractUser(item).name,
			Email: extractUser(item).email,
			Phone: extractUser(item).phone,
			TransactionType: extractUser(item).type,
			Amount:
				extractUser(item).type === TransactionType.Collect
					? currencyFormat.format(-1 * item.amount)
					: currencyFormat.format(item.amount),
			Balance: currencyFormat.format(item.balance),
			Date: dayjs(item.createdAt).format('ddd DD MMMM YYYY'),
		}));

		const ws = XLSX.utils.json_to_sheet(toDownload);

		const wb = XLSX.utils.book_new();

		XLSX.utils.book_append_sheet(wb, ws, 'CashStatements');

		XLSX.writeFile(wb, 'sales.xlsx');
	};

	return (
		<div className='flex flex-col my-5 gap-4'>
			<p className='text-3xl font-bold px-4'>Cash Statements</p>
			<Balances storeId={storeId} storeCash={storeCash} storeFloat={storeFloat} team={team} />
			<StatementsDatePicker setDate={setDate} date={date} className='' />
			<div>
				<DataTable
					columns={columns}
					data={data}
					searchColumn='name'
					searchPlaceholder='Search by name'
					black
					download={handleDownload}
				/>
			</div>
		</div>
	);
};

export default StoreCashStatementsComponent;
