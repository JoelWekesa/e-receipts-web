import {options} from '@/app/api/auth/[...nextauth]/options';
import AllClients from '@/components/clients/all';
import {allClients} from '@/services/page/clients/all';
import {getServerSession} from 'next-auth';

const ClientsPage = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const clients = await allClients({token});

	return (
		<div>
			<AllClients clients={clients} />
		</div>
	);
};

export default ClientsPage;
