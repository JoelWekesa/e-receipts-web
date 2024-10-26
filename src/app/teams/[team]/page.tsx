import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {TeamSiteHeader} from '@/components/teams/site-header/site-header';
import {Permissions} from '@/config/permissions';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeam} from '@/services/page/teams/get-team';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';
import {notFound, redirect} from 'next/navigation';

const TeamLandingPage = async (props: {params: Promise<{team: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);

    const token = session?.accessToken || '';

    const [teams, stores, permissions] = await Promise.all([
		getTeams({token}),
		userStores(token),
		getPermissions({token}),
	]);

    const {team: teamId} = params;

    const t = getTeam({token, id: teamId});

    const sft = getStoreFromTeam({token, id: teamId});

    const [team, storeFromTeam] = await Promise.all([t, sft]);

    const {id: storeId} = storeFromTeam.store;

    if (!team) {
		return notFound();
	}

    if (team && team.permission.permission !== Permissions.Admin) {
		redirect(`/teams/soon/${teamId}`);
	}

    if (team && team.permission.permission === Permissions.Admin) {
		redirect(`/teams/dashboard/${teamId}`);
	}

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
						<div>{JSON.stringify(team)}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TeamLandingPage;
