'use client';
import {storeAtom} from '@/atoms/store';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {Total} from '@/models/inventory/total';
import {Store} from '@/models/store';
import useInvValue from '@/services/inventory/values/store';
import useDeleteStore from '@/services/stores/delete';
import useUserStores, {StoreFetch} from '@/services/stores/user-stores';
import currencyFormat from '@/utils/currency';
import {ColumnDef} from '@tanstack/react-table';
import {useAtom} from 'jotai';
import {ArrowUpDown, LayoutDashboard, Loader2, MoreHorizontal, Trash2} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {FC, useState} from 'react';
import {DataTable} from '../shared/datatable';
import {LoadingSpinner} from '../shared/spinner';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {Sheet, SheetClose, SheetContent, SheetFooter} from '../ui/sheet';
import StoreButtonDropDown from './dropdown';
import StoreComponent from './store';
import Link from 'next/link';

export interface Props extends StoreFetch {
	total: Total;
}

const UserStores = ({initialData, token, total}: Props) => {
	const [open, setOpen] = useState(false);

	const {data, isLoading} = useUserStores({initialData, token});

	const [store, setStore] = useAtom(storeAtom);

	const url = 'inventory/all/value';

	const {data: tot} = useInvValue({
		url,
		initialData: total,
	});

	const router = useRouter();

	const columns: ColumnDef<Store>[] = [
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
						<StoreButtonDropDown
							drop={{
								label: 'Store Actions',
								store: row.original,
							}}>
							<Button onClick={() => handleEditStore(row.original)} size='icon' variant='ghost'>
								<MoreHorizontal className='mr-2 h-4 w-4' />
							</Button>
						</StoreButtonDropDown>
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

	const handleEditStore = (store: Store) => {
		router.push('/stores/update?id=' + store.id);
		setStore(store);
	};

	const handleDeleteDialog = () => {
		setOpen(!open);
	};

	return (
		<div className='flex p-3 flex-col'>
			<Sheet>
				<div className='m-3 p-5 rounded-md border'>
					<DataTable
						columns={columns}
						data={data || []}
						searchColumn='name'
						searchPlaceholder='Search by store name...'
						title='Inventory Value'
						subtitle={`Total inventory value across all stores ${currencyFormat.format(tot?.total || 0)}`}
					/>
					<DeleteDialog open={open} setOpen={handleDeleteDialog} token={token} />
				</div>
				<SheetContent>
					<StoreComponent />
					<SheetFooter>
						<SheetClose asChild>
							<div className='flex flex-row gap-3 mt-2'>
								<Link href={`/store/dashboard/${store?.id}`}>
									<Button size='sm'>
										<LayoutDashboard className='h-4 w-4 mr-2' />
										Go to Dashboard
									</Button>
								</Link>
								<Button variant='destructive' onClick={handleDeleteDialog} size='sm'>
									<Trash2 className='h-4 w-4 mr-2' />
									Delete
								</Button>
							</div>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default UserStores;

const DeleteDialog: FC<{open: boolean; setOpen: () => void; token: string}> = ({open, setOpen, token}) => {
	const router = useRouter();

	const [store, _] = useAtom(storeAtom);

	const [text, setText] = useState('');

	const successFn = () => {
		router.push('/stores/all');
		setText('');
		setOpen();
	};

	const {mutate, isPending} = useDeleteStore(successFn);

	const handleDelete = () => {
		mutate({
			id: store?.id || '',
			token: token,
		});
	};

	return (
		<Dialog open={open}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Delete Store</DialogTitle>
					<DialogDescription>You are about to delete {store?.name}. This action is irreversible</DialogDescription>
				</DialogHeader>
				<Input placeholder={'Enter store name to confirm'} value={text} onChange={(e) => setText(e.target.value)} />
				<DialogFooter>
					<DialogClose asChild>
						<div className='flex flex-row gap-2'>
							<Button onClick={setOpen}>Cancel</Button>
							<Button onClick={handleDelete} variant='destructive' disabled={text !== store?.name}>
								{isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
								Continue
							</Button>
						</div>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
