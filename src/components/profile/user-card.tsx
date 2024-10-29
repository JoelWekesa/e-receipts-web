'use client';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter} from '@/components/ui/card';
import {Profile} from '@/models/profile/user-profile';
import {Edit} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {FC, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '../ui/avatar';
import ProfileItem from './profile-item';
import EditDialog from './edit-dialog';

const UserCard: FC<{profile: Profile}> = ({profile}) => {
	const {data: user} = useSession({
		required: true,
	});

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen((open) => !open);
	};

	return (
		<>
			<Card className='w-full'>
				<CardContent className='grid gap-4 pt-4'>
					<div className=' flex items-center justify-center'>
						<Avatar className='h-24 w-24'>
							<AvatarImage src={profile?.dp ? profile?.dp : user?.picture || user?.image || ''} alt={user?.name || ''} />
							<AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
						</Avatar>
					</div>
					<div className=' flex items-center justify-center'>
						<div className='flex flex-col gap-4'>
							<p className='text-xl font-bold text-center'>{user?.name}</p>
							<p className='text-md text-center'>{user?.email}</p>
							{/* <p className='text-md text-center'>{user?.}</p> */}
						</div>
					</div>
					<div>
						{profile?.address && (
							<ProfileItem
								data={{
									title: 'Address',
									content: profile.address,
								}}
							/>
						)}

						{profile?.phone && (
							<ProfileItem
								data={{
									title: 'Phone',
									content: profile.phone,
								}}
							/>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button className='w-full' onClick={handleOpen}>
						<Edit className='mr-2 h-4 w-4' /> Edit Profile
					</Button>
				</CardFooter>
			</Card>
			<EditDialog open={open} profile={profile} toggleOpen={handleOpen} />
		</>
	);
};

export default UserCard;
