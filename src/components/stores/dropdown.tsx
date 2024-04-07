'use client';
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {FC, ReactNode} from 'react';
import {Store} from '@/models/store';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {SheetTrigger} from '../ui/sheet';
import {useAtom} from 'jotai';
import {storeAtom} from '@/atoms/store';

interface Drop {
	label: string;
	store: Store;
}

const StoreButtonDropDown: FC<{drop: Drop; children: ReactNode}> = ({drop, children}) => {
	const [_, setStore] = useAtom(storeAtom);

	const handleClick = () => {
		setStore(drop.store);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{drop.label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`/receipts/create?id=${drop.store.id}`}>
						<DropdownMenuItem>
							<User className='mr-2 h-4 w-4' />
							<span>Create Receipt</span>
							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
					<SheetTrigger asChild>
						<DropdownMenuItem onClick={handleClick}>
							<CreditCard className='mr-2 h-4 w-4' />
							<span>View Store</span>
							<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
						</DropdownMenuItem>
					</SheetTrigger>
					<Link href={`/stores/update?id=${drop.store.id}`}>
						<DropdownMenuItem>
							<Settings className='mr-2 h-4 w-4' />
							<span>Edit Store</span>
							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StoreButtonDropDown;
