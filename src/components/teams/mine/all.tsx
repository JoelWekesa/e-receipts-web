'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Store} from '@/models/store';
import {MyTeam} from '@/models/teams/my-teams';
import {Permission} from '@/models/teams/permissions';
import useUserStores from '@/services/stores/user-stores';
import useMyTeams from '@/services/teams/mine';
import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, MoreHorizontal} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import MineDropDown from '../minedropdown';

interface Props {
	data: MyTeam[];
	permissions: Permission[];
	stores: Store[];
}

const AllTeamsComponent: FC<Props> = ({data, stores, permissions}) => {
	const {data: teams} = useMyTeams(data);

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {data: allStores = []} = useUserStores({initialData: stores, token});

	const columns: ColumnDef<MyTeam>[] = [
		{
			accessorKey: 'name',
			header: ({column}) => {
				return (
					<div className='flex md:justify-start'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Team
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex md:justify-start'>{row.original.name}</div>;
			},
		},

		{
			accessorKey: 'store',
			header: ({column}) => {
				return (
					<div className='flex md:justify-end'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Store
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex md:justify-end mr-5'>{row.original.store.displayName}</div>;
			},
		},

		{
			accessorKey: 'permission',
			header: ({column}) => {
				return (
					<div className='flex md:justify-end'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Permission
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex md:justify-end mr-5'>{row.original.permission.permission}</div>;
			},
		},

		{
			accessorKey: 'action',
			header: () => {
				return <div className='flex md:justify-end'>Action</div>;
			},

			cell: ({row}) => {
				return (
					<div className='flex md:justify-end'>
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
		<Card>
			<CardHeader>
				<CardTitle>My teams</CardTitle>
				<CardDescription>A lits of all teams that help you manage your stores</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable columns={columns} data={teams} searchColumn='name' searchPlaceholder='Search by team name...' />
			</CardContent>
		</Card>
	);
};

export default AllTeamsComponent;
