'use client';
import useProfile from '@/services/profile/get-profile';
import {signOut, useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
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

const UserNav = () => {
	const {data: user} = useSession();

	const {data: profile} = useProfile({
		profile: null,
	});

	const router = useRouter();

	const handleRedirect = (href: string) => {
		router.push(href);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src={profile?.dp ? profile?.dp : user?.image || user?.picture || ''} alt='@joelwekesa_' />
						<AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user?.name}</p>
						<p className='text-xs leading-none text-muted-foreground'>{user?.email || ''}</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => handleRedirect('/profile')}>Profile</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleRedirect('/pay/invoices')}>Billing</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleRedirect('/settings')}>Settings</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleRedirect('/general/teams/add')}>New Team</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() =>
						signOut({
							callbackUrl: '/auth/login',
							redirect: true,
						})
					}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserNav;
