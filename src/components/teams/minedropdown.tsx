'use client';
import {Edit, Send, Trash2} from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MyTeam} from '@/models/teams/my-teams';
import {FC, ReactNode, useState} from 'react';
import {Dialog, DialogContent} from '../ui/dialog';
import SendInvite from './invites/send';
import EditTeamComponent from './edit/edit-team';
import {Permission} from '@/models/teams/permissions';
import {Store} from '@/models/store';
import DeleteTeam from './delete/delete';

interface Drop {
	label: string;
	team: MyTeam;
	permissions: Permission[];
	stores: Store[];
}

enum Types {
	SEND = 'send',
	EDIT = 'edit',
	DELETE = 'delete',
}

const MineDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState<Types>(Types.SEND);
	const handleClick = () => {
		setOpen(!open);
		setType(Types.SEND);
	};

	const handleEdit = () => {
		setOpen(!open);
		setType(Types.EDIT);
	};

	const handleDelete = () => {
		setOpen(!open);
		setType(Types.DELETE);
	};

	return (
		<Dialog open={open}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem className='cursor-pointer' onClick={handleClick}>
							<Send className='mr-2 h-4 w-4' />
							<span>Send Invite</span>
						</DropdownMenuItem>

						<DropdownMenuItem onClick={handleEdit} className='cursor-pointer'>
							<Edit className='mr-2 h-4 w-4' />
							<span>Edit Team</span>
						</DropdownMenuItem>

						<DropdownMenuItem className='cursor-pointer' onClick={handleDelete}>
							<Trash2 className='mr-2 h-4 w-4' color='red' />
							<span>Delete Team</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent className='sm:max-w-[425px]'>
				{type === Types.EDIT && (
					<EditTeamComponent team={drop.team} close={handleEdit} permissions={drop.permissions} stores={drop.stores} />
				)}
				{type === Types.SEND && <SendInvite teamId={drop.team.id} close={handleClick} teamName={drop.team.name} />}

				{type === Types.DELETE && <DeleteTeam team={drop.team} handleClick={handleDelete} />}
			</DialogContent>
		</Dialog>
	);
};

export default MineDropDown;
