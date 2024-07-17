import {options} from '@/app/api/auth/[...nextauth]/options';
import {MainNav} from '@/components/dashboard/MainNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getServerSession} from 'next-auth';

const TeamLandingPage = async ({params}: {params: {team: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [teams, stores, permissions] = await Promise.all([
		getTeams({token}),
		userStores(token),
		getPermissions({token}),
	]);

	const {team: teamId} = params;

	console.log({
		teamId,
	});

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
						<MainNav className='mx-6' />
					</div>
				</div>
			</div>

			<div className='flex-1 space-y-4 p-8 pt-6'>
				<div>{JSON.stringify(session)}</div>
			</div>
		</>
	);
};

export default TeamLandingPage;
