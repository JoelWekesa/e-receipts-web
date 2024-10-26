import {options} from '@/app/api/auth/[...nextauth]/options';
import {MainNav} from '@/components/dashboard/MainNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import UpdateStoreComponent from '@/components/stores/update';
import ApiClient from '@/config/axios';
import {Store} from '@/models/store';
import {userStores} from '@/services/page/stores/user-stores';
import {getTeams} from '@/services/page/teams/member-teams';
import {getPermissions} from '@/services/page/teams/permissions';
import {getServerSession} from 'next-auth';
import {FC} from 'react';

interface GetData {
	id: string;
	token: string;
}

async function getData({id, token}: GetData): Promise<Store> {
	const res = await ApiClient(token)
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/store?id=' + id)
		.then((res) => res.data)
		.catch((err) => {
			// console.log(err?.response?.data);initialData});
			throw new Error(err);
		});

	return res;
}

type Params = Promise<{id: string}>;

const StoresPage: FC<{params: Params}> = async ({params}) => {
	const {id} = await params;

	const session = await getServerSession(options);

	const token = session?.accessToken;

	const [data, teams, stores, permissions] = await Promise.all([
		getData({id, token: token ? token : ''}),
		getTeams({token: token ? token : ''}),
		userStores(token ? token : ''),
		getPermissions({token: token ? token : ''}),
	]);

	// const data = await getData({
	// 	token: token ? token : '',
	// 	id,
	// });

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
				<UpdateStoreComponent id={id} initialData={data} token={token ? token : ''} />
			</div>
		</>
	);
};

export default StoresPage;
