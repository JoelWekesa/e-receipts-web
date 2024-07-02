'use client';
import {Delete, Edit, Trash} from 'lucide-react';

import {Dialog, DialogContent} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Category} from '@/models/inventory/category';
import {DialogTrigger} from '@radix-ui/react-dialog';
import {FC, ReactNode, useState} from 'react';
import EditCategory from './edit';
import DeleteCategory from './delete';

interface Drop {
	label: string;
	category: Category;
}

enum ActionType {
	EDIT,
	DELETE,
}

const CategoryDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	const [open, setOpen] = useState(false);
	const [type, seType] = useState(ActionType.EDIT);
	const handleClick = () => {
		setOpen(!open);
		seType(ActionType.EDIT);
	};

	const handleDelete = () => {
		setOpen(!open);
		seType(ActionType.DELETE);
	};

	return (
		<Dialog open={open}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56'>
					<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DialogTrigger asChild>
							<DropdownMenuItem onClick={handleClick}>
								<Edit className='mr-2 h-4 w-4' />
								<span>Edit Category</span>
							</DropdownMenuItem>
						</DialogTrigger>

						<DropdownMenuItem onClick={handleDelete}>
							<Trash className='mr-2 h-4 w-4' />
							<span>Delete Category</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent className='sm:max-w-[425px]'>
				{type === ActionType.EDIT ? (
					<EditCategory category={drop.category} handleClick={handleClick} />
				) : (
					<DeleteCategory category={drop.category} handleClick={handleDelete} />
				)}
			</DialogContent>
		</Dialog>
	);
};

export default CategoryDropDown;
