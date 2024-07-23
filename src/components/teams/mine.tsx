'use client';
import {MyTeam} from '@/models/teams/my-teams';
import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {FC} from 'react';
import {DataTable} from '../shared/datatable';
import {Button} from '../ui/button';
import useMyTeams from '@/services/teams/mine';
import MineDropDown from './minedropdown';
import {Store} from '@/models/store';
import useUserStores from '@/services/stores/user-stores';
import {useSession} from 'next-auth/react';
import {Permission} from '@/models/teams/permissions';

interface Props {
	data: MyTeam[];
	permissions: Permission[];
	stores: Store[];
}

const MyTeamsComponent: FC<Props> = ({data, stores, permissions}) => {
	const {data: teams} = useMyTeams(data);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {data: allStores} = useUserStores({initialData: stores, token});

	const columns: ColumnDef<MyTeam>[] = [
		{
			accessorKey: 'name',
			header: ({column}) => {
				return (
					<div className='flex justify-start'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Team
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex justify-start'>{row.original.name}</div>;
			},
		},

		{
			accessorKey: 'store',
			header: ({column}) => {
				return (
					<div className='flex justify-end'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Store
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex justify-end mr-5'>{row.original.store.displayName}</div>;
			},
		},

		{
			accessorKey: 'permission',
			header: ({column}) => {
				return (
					<div className='flex justify-end'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Permission
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex justify-end mr-5'>{row.original.permission.permission}</div>;
			},
		},

		{
			accessorKey: 'action',
			header: () => {
				return <div className='flex justify-end'>Action</div>;
			},

			cell: ({row}) => {
				return (
					<div className='flex justify-end'>
						<MineDropDown
							drop={{
								label: 'Team Actions',
								team: row.original,
								stores: allStores || [],
								permissions,
							}}>
							<Button variant='ghost' size='icon'>
								<MoreHorizontal className='mr-2 h-4 w-4' />
							</Button>
						</MineDropDown>
					</div>
				);
			},
		},
	];

	return (
		<div className='flex p-3 flex-col'>
			<div className='m-3 p-5 rounded-md border'>
				<DataTable columns={columns} data={teams} searchColumn='name' searchPlaceholder='Search by team name...' />
			</div>
		</div>
	);
};

export default MyTeamsComponent;
