import {MoreHorizontal, Trash2} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {FC} from 'react';

interface Props {
	onDelete: () => void;
}

export const DeleteDropDown: FC<Props> = ({onDelete}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuItem onClick={() => onDelete()}>
					<Trash2 className='mr-2 h-4 w-4' color='red' />
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
