'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Inventory, Variant} from '@/models/inventory/inventory';
import useInventoryVariants from '@/services/inventory/variants/by-inventory';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {FC} from 'react';
import SeeInventoryDropDown from './see-dropdown';

interface Props {
	inventory: Inventory;
}

const columns: ColumnDef<Variant>[] = [
	{
		accessorKey: 'name',
		header: ({column}) => {
			return (
				<div className='flex justify-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Variant
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row: {original: row}}) => {
			return (
				<div className='flex justify-end pr-5'>
					<div
						className={`flex flex-col gap-1 w-full border border-dotted border-primary/50 rounded-md p-2  ${
							row.quantity <= row.warnLevel ? ' text-red-500' : ''
						}`}>
						{row.name.map((item, index) => (
							<div key={index} className='flex flex-row justify-between'>
								<span>{item.name}</span>
								<span className='ml-2'>{item.value}</span>
							</div>
						))}
					</div>
				</div>
			);
		},
	},

	{
		accessorKey: 'quantity',
		header: ({column}) => {
			return (
				<div className='flex justify-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Quantity
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row: {original: row}}) => {
			return (
				<div className={`flex justify-end pr-5 ${row.quantity <= row.warnLevel ? ' text-red-500' : ''}`}>
					{row.quantity}
				</div>
			);
		},
	},

	{
		accessorKey: 'price',
		header: ({column}) => {
			return (
				<div className='flex justify-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Price Each
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},
		cell: ({row: {original: row}}) => {
			return (
				<div className={`flex justify-end pr-5 ${row.quantity <= row.warnLevel ? ' text-red-500 ' : ''}`}>
					{currencyFormat.format(+row.price)}
				</div>
			);
		},
	},

	{
		accessorKey: 'warnLevel',
		header: ({column}) => {
			return (
				<div className='flex justify-end'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Warn Level
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row: {original: row}}) => {
			return (
				<div className={`flex justify-end pr-5 ${row.quantity <= row.warnLevel ? ' text-red-500' : ''}`}>
					{row.warnLevel}
				</div>
			);
		},
	},

	{
		accessorKey: 'id',
		header: () => {
			return <div className='flex justify-end'>Actions</div>;
		},
		cell: ({row: {original: row}}) => {
			return (
				<div className='flex justify-end pr-5'>
					<SeeInventoryDropDown
						drop={{
							label: 'Manage Variant',
							variant: row || null,
						}}>
						<Button variant='ghost' size='icon'>
							<MoreHorizontal className='mr-2 h-4 w-4' />
						</Button>
					</SeeInventoryDropDown>
				</div>
			);
		},
	},
];

const SeeProductVariants: FC<Props> = ({inventory}) => {
	const {data: variants = []} = useInventoryVariants({
		id: inventory?.id || '',
		variants: inventory?.Variant || [],
	});

	return (
		<div className='pt-5 rounded-md border'>
			<DataTable columns={columns} data={variants} searchColumn='name' searchPlaceholder='Search by variant name' black />
		</div>
	);
};

export default SeeProductVariants;
