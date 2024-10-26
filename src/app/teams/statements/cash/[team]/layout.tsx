import {options} from '@/app/api/auth/[...nextauth]/options';
import {TeamNav} from '@/components/dashboard/TeamNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import {TeamSiteHeader} from '@/components/teams/site-header/site-header';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';

interface CashLayoutProps {
	children: React.ReactNode;
	params: Promise<{team: string}>;
}

export default async function CashLayout(props: CashLayoutProps) {
    const params = await props.params;

    const {
        children
    } = props;

    const session = await getServerSession(options);

    const {team} = params;

    const token = session?.accessToken || '';

    const [stores, teams, permissions, {store}] = await Promise.all([
		userStores(token),
		getTeams({token}),
		getPermissions({token}),
		getStoreFromTeam({id: team, token}),
	]);

    return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<TeamSiteHeader storeId={store.id} teamId={team} />
					<main className='flex-1'>
						<div className='hidden flex-col md:flex'>
							<div className='border-b'>
								<div className='flex h-16 items-center px-4'>
									<TeamSwitcher teams={teams} stores={stores} permissions={permissions} />
									<TeamNav className='mx-6' id={team} storeId={store.id} />
								</div>
							</div>
						</div>

						{children}
					</main>
				</div>
			</div>
		</>
	);
}
