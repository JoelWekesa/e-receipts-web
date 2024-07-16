import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Store} from '@/models/store';
import {MyTeam} from '@/models/teams/my-teams';
import {Permission} from '@/models/teams/permissions';
import {FC} from 'react';
import PendingInvitesComponent from './invites/pending';
import MyTeamsComponent from './mine';
import {PendingInvite} from '@/models/teams/pending-invites';

interface Props {
	data: MyTeam[];
	permissions: Permission[];
	stores: Store[];
	invites: PendingInvite[];
}

const TeamsTabs: FC<Props> = ({data, stores, permissions, invites}) => {
	return (
		<Tabs defaultValue='teams' className='w-full'>
			<TabsList className='grid w-[400px] grid-cols-2'>
				<TabsTrigger value='teams'>My Teams</TabsTrigger>
				<TabsTrigger value='pending'>Pending Invites</TabsTrigger>
			</TabsList>
			<TabsContent value='teams'>
				<MyTeamsComponent data={data} stores={stores} permissions={permissions} />
			</TabsContent>
			<TabsContent value='pending'>
				<PendingInvitesComponent invites={invites} />
			</TabsContent>
		</Tabs>
	);
};

export default TeamsTabs;
