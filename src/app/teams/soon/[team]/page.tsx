import {options} from '@/app/api/auth/[...nextauth]/options';
import ComingSoon from '@/components/teams/coming-soon';
import {Permissions} from '@/config/permissions';
import {getTeam} from '@/services/page/teams/get-team';
import {getServerSession} from 'next-auth';
import {notFound, redirect} from 'next/navigation';

const TeamLandingPage = async ({params}: {params: {team: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {team: teamId} = params;

	const t = getTeam({token, id: teamId});

	const [team] = await Promise.all([t]);

	if (!team) {
		return notFound();
	}

	if (team && team.permission.permission === Permissions.Admin) {
		redirect(`/teams/${teamId}`);
	}

	return (
		<>
			<div vaul-drawer-wrapper=''>
				<div className='relative flex min-h-screen flex-col bg-background'>
					<div className='flex-1 space-y-4 p-8 pt-6'>
						<ComingSoon team={team} />
					</div>
				</div>
			</div>
		</>
	);
};

export default TeamLandingPage;
