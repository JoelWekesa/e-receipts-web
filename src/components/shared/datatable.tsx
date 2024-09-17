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
import React, {useState} from 'react';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {DownloadIcon} from 'lucide-react';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchColumn?: string;
	searchPlaceholder: string;
	black?: boolean;
	title?: string;
	subtitle?: string;
	download?: () => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchColumn,
	searchPlaceholder,
	black,
	title,
	subtitle,
	download,
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
		<div className={`rounded-md ${black && 'dark:bg-[#000000]'}`}>
			{title && (
				<div className='mb-6 p-5'>
					<h2 className='text-2xl font-bold text-primary'>{title}</h2>
					{subtitle && <p className='text-muted-foreground text-sm'>{subtitle}</p>}
				</div>
			)}
			{download && (
				<div className='flex items-center justify-end space-x-2 py-4'>
					<Button className='h-8 w-8 p-0' onClick={download}>
						<span className='sr-only'>Download</span>
						<DownloadIcon className='h-4 w-4' />
					</Button>
				</div>
			)}
			<div className='flex items-center py-4 px-4'>
				<Input
					placeholder={searchPlaceholder}
					value={(table.getColumn(searchColumn ?? 'name')?.getFilterValue() as string) ?? ''}
					onChange={(event: any) => table.getColumn(searchColumn ?? 'name')?.setFilterValue(event.target.value)}
					className='max-w-sm'
				/>
			</div>

			{/* For larger screens, render the table */}
			<div className='hidden md:block p-4'>
				<Table className='relative'>
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

			{/* For smaller screens, render cards instead of table */}
			<div className='block md:hidden p-4'>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<div key={row.id} className='p-4 mb-4  rounded-lg shadow-md border'>
							{row.getVisibleCells().map((cell) => {
								const header = cell.column.columnDef.header as string;

								return (
									<div key={cell.id} className='mb-2'>
										<span className='font-semibold'>{header}</span>
										<span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
									</div>
								);
							})}
						</div>
					))
				) : (
					<div className='text-center py-6'>No results found.</div>
				)}
			</div>

			{data.length > 0 && (
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
			)}
		</div>
	);
}
