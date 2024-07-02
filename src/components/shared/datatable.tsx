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
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from '@radix-ui/react-icons';
import {useState} from 'react';
import {Button} from '../ui/button';
import {Input} from '../ui/input';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchColumn: string;
	searchPlaceholder: string;
	black?: boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchColumn,
	searchPlaceholder,
	black,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

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

	return (
		<div className={`rounded-md ${black && 'bg-[#000000]'}`}>
			<div className='flex items-center py-4 px-4'>
				<Input
					placeholder={searchPlaceholder}
					value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''}
					onChange={(event: any) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
			</div>
			<div className='p-4'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className='bg-accent'>
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
										<TableCell key={cell.id} className='font-medium'>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
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

			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<Button
					variant='outline'
					className='hidden h-8 w-8 p-0 lg:flex'
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}>
					<span className='sr-only'>Go to first page</span>
					<DoubleArrowLeftIcon className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					className='h-8 w-8 p-0'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}>
					<span className='sr-only'>Go to previous page</span>
					<ChevronLeftIcon className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					className='h-8 w-8 p-0'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}>
					<span className='sr-only'>Go to next page</span>
					<ChevronRightIcon className='h-4 w-4' />
				</Button>
				<Button
					variant='outline'
					className='hidden h-8 w-8 p-0 lg:flex'
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}>
					<span className='sr-only'>Go to last page</span>
					<DoubleArrowRightIcon className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
}
