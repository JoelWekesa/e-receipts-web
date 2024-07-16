import {options} from '@/app/api/auth/[...nextauth]/options';
import {Search} from '@/components/dashboard/Search';
import {Skeleton} from '@/components/ui/skeleton';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getMineTeams} from '@/services/page/teams/mine';
import {getPendingInvites} from '@/services/page/teams/pending-invites';
import {getPermissions} from '@/services/page/teams/permissions';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicMainNav = dynamic(() => import('../../components/dashboard/MainNav').then((mod) => mod.MainNav), {
	loading: () => <Skeleton className='h-8 w-full' />,
});

const DynamicTeamSwitcher = dynamic(() => import('../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-8 w-full' />,
});

const DynamicTeamsTabs = dynamic(() => import('../../components/teams/tabs'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const MyTeams = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [teams, stores, permissions, mine, invites] = await Promise.all([
		getTeams({token}),
		userStores(token),
		getPermissions({token}),
		getMineTeams({token}),
		getPendingInvites({token}),
	]);

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<DynamicTeamSwitcher teams={teams} stores={stores} permissions={permissions} />
						<DynamicMainNav className='mx-6' />
						<div className='ml-auto flex items-center space-x-4'>
							<Search />
						</div>
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<DynamicTeamsTabs data={mine} stores={stores} permissions={permissions} invites={invites} />
			</div>
		</>
	);
};

export default MyTeams;
