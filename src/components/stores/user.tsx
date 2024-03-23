'use client';
import useUserStores from '@/services/stores/user-stores';
import React, {FC, useState} from 'react';
import {LoadingSpinner} from '../shared/spinner';
import {StoreDatum} from '@/models/store';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '../ui/card';
import {DataTable} from './usertable';
import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import {Button} from '../ui/button';
import {toast} from 'sonner';
import Image from 'next/image';
import {ArrowUpDown, Edit, Eye, MoreHorizontal} from 'lucide-react';
import {Input} from '../ui/input';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';

const UserStores = () => {
	const {data, isLoading} = useUserStores('1');
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const columns: ColumnDef<StoreDatum>[] = [
		{
			accessorKey: 'logo',
			header: '',
			cell: ({row}) => {
				return (
					<div className='flex'>
						<Image
							src={row.original.logo}
							width={40}
							height={40}
							alt='logo'
							style={{
								borderRadius: 20,
							}}
						/>
					</div>
				);
			},
		},

		{
			accessorKey: 'name',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Name
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
		},

		{
			accessorKey: 'address',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Address
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
			accessorKey: 'email',
			header: ({column}) => {
				return (
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Email
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				);
			},
		},

		{
			accessorKey: 'id',
			header: 'Action',
			cell: ({row}) => {
				return (
					<div className='flex flex-row gap-2'>
						<SheetTrigger asChild>
							<Button onClick={() => handleClick(row.original.id)}>
								<Eye className='mr-2 h-4 w-4' /> View
							</Button>
						</SheetTrigger>

						<Button>
							<Edit className='mr-2 h-4 w-4' />
							Edit
						</Button>
					</div>
				);
			},
		},
	];

	if (isLoading) {
		return (
			<div className='flex flex-1 h-screen justify-center items-center'>
				<LoadingSpinner />
			</div>
		);
	}

	const handleClick = (id: string) => {
		toast('Clicked ' + id);
	};

	return (
		<div className='flex p-3 w-screen flex-col'>
			<Sheet>
				<div className='m-3 p-5 rounded-md border'>
					<DataTable columns={columns} data={data?.data || []} />
				</div>
				<SheetContent>
					<p>Hello World</p>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default UserStores;
