'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {Loader2} from 'lucide-react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	nextPage: number | boolean;
	previousPage: number | boolean;
	fetching: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	nextPage,
	previousPage,
	fetching,
}: DataTableProps<TData, TValue>) {
	const [active, setActive] = useState('previous');

	const [button, setButton] = useState('0');

	const [sorting, setSorting] = useState<SortingState>([]);

	const router = useRouter();

	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	useEffect(() => {
		if (active === 'previous') {
			setButton('1');
		} else if (active === 'next') {
			setButton('2');
		} else {
			setButton('0');
		}
	}, [active]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	const handlePrevious = () => {
		if (previousPage) {
			router.push(pathname + '?' + createQueryString('page', '' + previousPage));
		}

		setActive('previous');
	};

	const handleNext = () => {
		if (nextPage) {
			router.push(pathname + '?' + createQueryString('page', '' + nextPage));
		}

		setActive('next');
	};

	return (
		<div className='rounded-md'>
			<div className='flex items-center py-4 px-4'>
				<Input
					placeholder='Search By Shop Name...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event: any) => table.getColumn('name')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
			</div>
			<div className='p-4'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className='flex items-center justify-end space-x-2 py-4 px-4'>
				<Button variant='outline' size='sm' onClick={() => handlePrevious()} disabled={!previousPage}>
					{fetching && button === '1' && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					Previous
				</Button>
				<Button variant='outline' size='sm' onClick={() => handleNext()} disabled={!nextPage}>
					{fetching && button === '2' && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
					Next
				</Button>
			</div>
		</div>
	);
}
