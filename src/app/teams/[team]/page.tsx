import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {TeamSiteHeader} from '@/components/teams/site-header/site-header';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
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

	const storeFromTeam = await getStoreFromTeam({
		token,
		id: teamId,
	});

	const {id: storeId} = storeFromTeam.store;

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<TeamSiteHeader storeId={storeId} teamId={teamId} />
					<div className='hidden flex-col md:flex'>
						<div className='border-b'>
							<div className='flex h-16 items-center px-4'>
								<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
							</div>
						</div>
					</div>

					<div className='flex-1 space-y-4 p-8 pt-6'>
						<div>{JSON.stringify(session)}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TeamLandingPage;
