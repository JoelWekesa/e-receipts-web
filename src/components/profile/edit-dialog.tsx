'use client';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Profile} from '@/models/profile/user-profile';
import {FC} from 'react';
import ProfileUpsert from './upsert';

const EditDialog: FC<{open: boolean; profile: Profile | null; toggleOpen: () => void}> = ({
	open,
	profile,
	toggleOpen,
}) => {
	return (
		<Dialog open={open}>
			<DialogContent className='sm:max-w-[425px] w-full max-w-[90vw] p-4 justify-start'>
				<DialogHeader>
					<DialogTitle>Update profile</DialogTitle>
					<DialogDescription>{`Make changes to your profile here. Click save when you're done.`}</DialogDescription>
				</DialogHeader>
				<ProfileUpsert profile={profile} toggleOpen={toggleOpen} />
			</DialogContent>
		</Dialog>
	);
};

export default EditDialog;
