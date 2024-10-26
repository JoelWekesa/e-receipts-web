import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {teamUsers} from '@/services/page/teams/team-users';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicMainNav = dynamic(() => import('../../../components/dashboard/MainNav').then((mod) => ({
    default: mod.MainNav
})), {
	loading: () => <Skeleton className='h-8 w-full' />,
});

const DynamicTeamSwitcher = dynamic(() => import('../../../components/dashboard/TeamSwitcher'), {
	loading: () => <Skeleton className='h-8 w-full' />,
});

const DynamicTeamUsers = dynamic(() => import('../../../components/teams/members/team-users'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const TeamUsersPage = async (props: {params: Promise<{team: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const [teams, stores, permissions, team_users] = await Promise.all([
		getTeams({token}),
		userStores(token),
		getPermissions({token}),
		teamUsers({token, id: params.team}),
	]);

    return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<DynamicTeamSwitcher teams={teams} stores={stores} permissions={permissions} />
						<DynamicMainNav className='mx-6' />
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<DynamicTeamUsers data={team_users} id={params.team} />
			</div>
		</>
	);
};

export default TeamUsersPage;
