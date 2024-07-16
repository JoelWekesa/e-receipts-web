'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {PendingInvite} from '@/models/teams/pending-invites';
import usePendingInvites from '@/services/teams/pending-invites';
import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown} from 'lucide-react';
import {FC} from 'react';

interface Props {
	invites: PendingInvite[];
}

const PendingInvitesComponent: FC<Props> = ({invites}) => {
	const {data: pending} = usePendingInvites({invites});

	const columns: ColumnDef<PendingInvite>[] = [
		{
			accessorKey: 'team',
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
				return <div className='flex justify-start'>{row.original.team.name}</div>;
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
				return <div className='flex justify-end mr-5'>{row.original.team.store.name}</div>;
			},
		},

		{
			accessorKey: 'email',
			header: ({column}) => {
				return (
					<div className='flex justify-end'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Invitee
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex justify-end mr-5'>{row.original.email}</div>;
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
				return <div className='flex justify-end mr-5'>{row.original.team.permission.permission}</div>;
			},
		},

		{
			accessorKey: 'action',
			header: () => {
				return <div className='flex justify-end'>Action</div>;
			},

			cell: () => {
				return (
					<div className='flex justify-end'>
						<Button variant='destructive' size='sm'>
							Cancel
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div className='flex p-3 flex-col'>
			<div className='m-3 p-5 rounded-md border'>
				<DataTable columns={columns} data={pending} searchColumn='name' searchPlaceholder='Search by team name...' />
			</div>
		</div>
	);
};

export default PendingInvitesComponent;
