import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreClients from '@/components/clients/store';
import {getStoreClients} from '@/services/page/clients/store';
import {getServerSession} from 'next-auth';

const StoreClientsPage = async ({params}: {params: {id: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {id: storeId} = params;

	const clients = await getStoreClients({storeId, token});

	return (
		<div>
			<StoreClients storeId={storeId} clients={clients} />
		</div>
	);
};

export default StoreClientsPage;
