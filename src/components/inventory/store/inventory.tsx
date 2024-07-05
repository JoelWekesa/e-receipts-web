'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Inventory} from '@/models/inventory/inventory';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown, Edit} from 'lucide-react';
import Image from 'next/image';
import {FC} from 'react';
import InventoryDropDown from './dropdown';

const columns: ColumnDef<Inventory>[] = [
	{
		accessorKey: 'image',
		header: ({column}) => {
			return (
				<div className='flex justify-start'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Image
					</Button>
				</div>
			);
		},

		cell: ({row}) => {
			const image = row.original.images[0];
			return (
				<div className='flex justify-start pl-5'>
					<Image src={image} alt='image' width={40} height={40} className='rounded' />
				</div>
			);
		},
	},

	{
		accessorKey: 'name',
		header: ({column}) => {
			return (
				<div className='flex justify-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Name
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => {
			const name = row.original.name;
			return <div className='flex justify-end pr-5'>{name}</div>;
		},
	},

	{
		accessorKey: 'category',
		header: ({column}) => {
			return (
				<div className='flex justify-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Category
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => {
			const category = row.original.category.name;
			return <div className='flex justify-end pr-5'>{category}</div>;
		},
	},

	{
		accessorKey: 'createdAt',
		header: ({column}) => {
			return (
				<div className='flex justify-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Added On
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => {
			const date = row.original.createdAt;
			return <div className='flex justify-end pr-5'>{dayjs(date).format('ddd  DD MMM YYYY')}</div>;
		},
	},

	{
		accessorKey: 'id',
		header: () => {
			return <div className='flex justify-end'>Actions</div>;
		},
		cell: ({row}) => {
			return (
				<div className='flex justify-end pr-5'>
					<InventoryDropDown
						drop={{
							label: 'Manage Inventory',
							id: row.original.id,
						}}>
						<Button>
							<Edit className='mr-2 h-4 w-4' />
							Manage
						</Button>
					</InventoryDropDown>
				</div>
			);
		},
	},
];

const StoreInventory: FC<{data: Inventory[]}> = ({data}) => {
	return (
		<div className='m-3 p-5 rounded-md border'>
			<DataTable columns={columns} data={data} searchColumn='name' searchPlaceholder='Search by inventory name...' />
		</div>
	);
};

export default StoreInventory;
