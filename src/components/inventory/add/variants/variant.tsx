'use client';
import variantsAtom, {ModeVariant} from '@/atoms/inventory/variants';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import {useAtom} from 'jotai';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import VariantsDropDown from './dropdown';

const columns: ColumnDef<ModeVariant>[] = [
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

		cell: ({row}) => {
			return (
				<div className='flex justify-end pr-5'>
					<div className='flex flex-col gap-1 w-full border border-dotted border-primary/50 rounded-md p-2'>
						{row.original.name.map((item, index) => (
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

		cell: ({row}) => {
			return <div className='flex justify-end pr-5'>{row.original.quantity}</div>;
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
		cell: ({row}) => {
			return <div className='flex justify-end pr-5'>{currencyFormat.format(+row.original.price)}</div>;
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

		cell: ({row}) => {
			return <div className='flex justify-end pr-5'>{row.original.warnLevel}</div>;
		},
	},

	{
		accessorKey: 'id',
		header: 'Action',
		cell: ({row}) => {
			return (
				<div className='flex flex-row gap-2'>
					<VariantsDropDown
						drop={{
							label: 'Actions',
							variant: row.original,
						}}>
						<Button variant='outline' size='icon'>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</VariantsDropDown>
				</div>
			);
		},
	},
];

const ProductVariant = () => {
	const [variants, _] = useAtom(variantsAtom);

	return (
		<div className='pt-5 rounded-md border'>
			<DataTable columns={columns} data={variants} searchColumn='name' searchPlaceholder='Search by variant name' />
		</div>
	);
};

export default ProductVariant;
