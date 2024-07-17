'use client';
import {DataTable} from '@/components/shared/datatable';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import {TeamMember, TeamUser} from '@/models/teams/team-users';
import useTeamUsers from '@/services/teams/team-users';
import {ColumnDef} from '@tanstack/react-table';
import {ArrowUpDown, Ban} from 'lucide-react';
import {FC, useState} from 'react';
import RemoveMember from './delete';

interface Props {
	data: TeamUser;
	id: string;
}

const TeamUsersComponent: FC<Props> = ({data, id}) => {
	const {data: members} = useTeamUsers({id, team_user: data});

	const [open, setOpen] = useState(false);

	const [member, setMember] = useState<TeamMember>();

	const handleClick = (member?: TeamMember) => {
		setOpen(!open);
		setMember(member);
	};

	const columns: ColumnDef<TeamMember>[] = [
		{
			accessorKey: 'name',
			accessorFn: (row) => row.user.name,
			header: ({column}) => {
				return (
					<div className='flex justify-start'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Name
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex justify-start'>{row.original.user.name}</div>;
			},
		},

		{
			accessorKey: 'email',
			accessorFn: (row) => row.user.email,
			header: ({column}) => {
				return (
					<div className='flex justify-end'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Email
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex justify-end mr-5'>{row.original.user.email}</div>;
			},
		},

		{
			accessorKey: 'phone',
			accessorFn: (row) => row?.user?.phone,
			header: ({column}) => {
				return (
					<div className='flex justify-end'>
						<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
							Phone Number
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					</div>
				);
			},

			cell: ({row}) => {
				return <div className='flex justify-end mr-5'>{row.original.user?.phone ? row.original.user.phone : 'N/A'}</div>;
			},
		},

		{
			accessorKey: 'action',
			header: () => {
				return <div className='flex justify-end pr-5'>Action</div>;
			},

			cell: ({row}) => {
				return (
					<div className='flex justify-end '>
						<Button variant='destructive' size='sm' onClick={() => handleClick(row.original)}>
							<Ban className='mr-2 h-4 w-4' />
							Remove User
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div className='flex p-3 flex-col'>
			<div className='m-3 rounded-md border'>
				<DataTable
					columns={columns}
					data={members.TeamMembers}
					searchColumn='name'
					searchPlaceholder='Search by team member name...'
					title={members.name}
					subtitle='Manage your team members.'
				/>
			</div>
			<Dialog open={open}>
				<DialogContent>
					<RemoveMember member={member} handleClick={() => handleClick()} teamId={id} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default TeamUsersComponent;
