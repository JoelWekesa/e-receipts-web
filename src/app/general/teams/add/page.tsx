import {options} from '@/app/api/auth/[...nextauth]/options';
import AddTeamIndependentComponent from '@/components/teams/add/add-team-independent';
import AllTeamsComponent from '@/components/teams/mine/all';
import {userStores} from '@/services/page/stores/user-stores';
import {getMineTeams} from '@/services/page/teams/mine';
import {getPermissions} from '@/services/page/teams/permissions';
import {getServerSession} from 'next-auth';

const AddTeam = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const strs = userStores(token);

	const perms = getPermissions({token});

	const dt = getMineTeams({token});

	const [stores, permissions, data] = await Promise.all([strs, perms, dt]);

	return (
		<div className='container mx-auto my-5 flex flex-col gap-4'>
			<AddTeamIndependentComponent stores={stores} permissions={permissions} />
			<AllTeamsComponent data={data} stores={stores} permissions={permissions} />
		</div>
	);
};

export default AddTeam;
