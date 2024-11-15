'use client';

import {Profile} from '@/models/profile/user-profile';
import useProfile from '@/services/profile/get-profile';
import {FC} from 'react';
import UserCard from './user-card';
import MyStores from './stores';
import {Store} from '@/models/store';
import {useSession} from 'next-auth/react';
import ResetComponent from './reset-password';
import PageLoader from '../shared/pageloader';

const UserProfile: FC<{profile: Profile | null; stores: Store[]}> = ({profile, stores}) => {
	const {data, isLoading} = useProfile({profile});

	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	if (isLoading) {
		return <PageLoader />;
	}

	if (data) {
		return (
			<div className='flex flex-col gap-8 pb-8 md:gap-16 md:pb-16 xl:pb-24'>
				<div className='flex flex-col md:flex-row h-full'>
					<div className='md:w-1/3 w-full md:h-full p-2'>
						<UserCard profile={data} />
					</div>

					<div className='md:w-2/3 w-full md:h-50 p-2'>
						<div className='flex flex-col gap-2'>
							<ResetComponent token={token} />
							<MyStores stores={stores} />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default UserProfile;
