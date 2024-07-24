import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreClients from '@/components/clients/store';
import {getStoreClients} from '@/services/page/clients/store';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {getServerSession} from 'next-auth';
import React from 'react';

const StoreClientsPage = async ({params}: {params: {id: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {id} = params;

	const storeFromTeam = await getStoreFromTeam({
		token,
		id,
	});

	const storeId = storeFromTeam?.store?.id;

	const clients = await getStoreClients({storeId, token});

	return (
		<div>
			<StoreClients storeId={storeId} clients={clients} />
		</div>
	);
};

export default StoreClientsPage;
