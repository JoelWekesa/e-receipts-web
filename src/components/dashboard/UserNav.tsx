'use client';
import {useClerk, useUser} from '@clerk/nextjs';
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar';
import {Button} from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {deleteCookie} from 'cookies-next';

const UserNav = () => {
	const {signOut} = useClerk();
	const {user} = useUser();

	const handleLogout = () => {
		signOut();
		deleteCookie('clerk_session');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={user?.imageUrl} alt='@shadcn' />
						<AvatarFallback>
							{user?.firstName?.slice(0, 1)} {user?.lastName?.slice(0, 1)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user?.fullName}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user?.emailAddresses[0].toString() || ''}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>New Team</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserNav;
