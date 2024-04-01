'use client';
import {StoreDatum} from '@/models/store';
import useUserStores, {StoreFetch} from '@/services/stores/user-stores';
import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, Edit, Eye} from 'lucide-react';
import Image from 'next/image';
import {toast} from 'sonner';
import {LoadingSpinner} from '../shared/spinner';
import {Button} from '../ui/button';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {DataTable} from './usertable';
import UpdateStoreComponent from './update';
import {useAtom} from 'jotai';
import {storeAtom} from '@/atoms/store';
import {useRouter} from 'next/navigation';

const UserStores = ({page, initialData}: StoreFetch) => {
	const {data, isLoading, isFetching, isRefetching} = useUserStores({page, initialData});

	const [_, setStore] = useAtom(storeAtom);

	const router = useRouter();

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
								borderRadius: '15%',
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

						<Button onClick={() => handleEditStore(row.original)}>
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

	const handleEditStore = (store: StoreDatum) => {
		router.push('/stores/update?id=' + store.id);
		setStore(store);
	};

	return (
		<div className='flex p-3 flex-col'>
			<Sheet>
				<div className='m-3 p-5 rounded-md border'>
					<DataTable
						columns={columns}
						data={data?.data || []}
						nextPage={data.nextPage}
						previousPage={data.currentPage > 1 ? data.currentPage - 1 : false}
						fetching={isRefetching || isFetching || isLoading}
					/>
				</div>
				<SheetContent>Hello World</SheetContent>
			</Sheet>
		</div>
	);
};

export default UserStores;
