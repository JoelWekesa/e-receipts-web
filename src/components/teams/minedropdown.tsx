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
import {FC, ReactNode} from 'react';

interface Drop {
	label: string;
	team: MyTeam;
}

const MineDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	const handleClick = () => {
		// setStore(drop.store);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer'>
						<Send className='mr-2 h-4 w-4' />
						<span>Send Invite</span>
					</DropdownMenuItem>

					<DropdownMenuItem onClick={handleClick} className='cursor-pointer'>
						<Edit className='mr-2 h-4 w-4' />
						<span>Edit Team</span>
					</DropdownMenuItem>

					<DropdownMenuItem className='cursor-pointer'>
						<Trash2 className='mr-2 h-4 w-4' color='red' />
						<span>Delete Team</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MineDropDown;
