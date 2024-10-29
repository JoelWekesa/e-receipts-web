import UserProfile from '@/components/profile/user';
import {profileView} from '@/services/page/profile/get';
import {getServerSession} from 'next-auth';
import {options} from '../api/auth/[...nextauth]/options';
import {userStores} from '@/services/page/stores/user-stores';

const Profile = async () => {
	const session = await getServerSession(options);

	const token = (await session?.accessToken) || '';

	const strs = userStores(token);
	const prf = profileView({token});

	const [stores, profile] = await Promise.all([strs, prf]);

	return (
		<div className='flex-1 space-y-4 p-8 pt-4'>
			<UserProfile profile={profile} stores={stores} />
		</div>
	);
};

export default Profile;
