'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Category} from '@/models/inventory/category';
import useStoreCategories from '@/services/inventory/categories/store';
import {ColumnDef} from '@tanstack/react-table';
import dayjs from 'dayjs';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {FC} from 'react';
import CategoryDropDown from './dropdown';

const columns: ColumnDef<Category>[] = [
	{
		accessorKey: 'name',
		header: ({column}) => {
			return (
				<div className='flex justify-start'>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Category
						<ArrowUpDown className='ml-2 h-4 w-4' />
					</Button>
				</div>
			);
		},

		cell: ({row}) => <div className='flex justify-start'>{row.original.name}</div>,
	},

	{
		accessorKey: 'date',
		header: ({column}) => {
			return (
				<div className='flex justify-start '>
					<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Created
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
		accessorKey: 'id',
		header: 'Action',
		cell: ({row}) => {
			return (
				<div className='flex flex-row gap-2'>
					<CategoryDropDown
						drop={{
							label: 'Actions',
							category: row.original,
						}}>
						<Button variant='outline' size='icon'>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</CategoryDropDown>
				</div>
			);
		},
	},
];

const CategoriesTable: FC<{category: Category[]; storeId: string}> = ({category, storeId}) => {
	const {data: categories} = useStoreCategories({storeId, categories: category});

	return (
		<div className='flex flex-col my-5'>
			<div>
				<DataTable columns={columns} data={categories} searchColumn='name' searchPlaceholder='Search category name' black />
			</div>
		</div>
	);
};

export default CategoriesTable;
