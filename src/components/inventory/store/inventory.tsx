'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Inventory} from '@/models/inventory/inventory';
import useInventory from '@/services/inventory/all/getinventory';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown, Edit} from 'lucide-react';
import Image from 'next/image';
import {FC} from 'react';
import InventoryDropDown from './dropdown';
import InvValue from '../value/value';
import {Total} from '@/models/inventory/total';
import useInvValue from '@/services/inventory/values/store';

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
							inventory: row.original,
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

interface Q {
	storeId: string;
	inventory: Inventory[];
	total: Total;
}

const StoreInventory: FC<{item: Q}> = ({item: {storeId, inventory: data, total}}) => {
	const {data: inventory} = useInventory({storeId, inventory: data});

	const url = `inventory/store/value?storeId=${storeId}`;

	const {data: tot} = useInvValue({
		url,
		initialData: total,
	});

	return (
		<div className='flex flex-col gap-4'>
			<InvValue title='Inventory Value' description='Total store inventory value' value={tot} url={url} />
			<DataTable
				columns={columns}
				data={inventory}
				searchColumn='name'
				searchPlaceholder='Search by inventory name...'
				black
			/>
		</div>
	);
};

export default StoreInventory;
