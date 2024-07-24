'use client';
import {Client} from '@/models/clients/clients';
import useStoreClients from '@/services/clients/store';
import {FC} from 'react';
import ClientsTable from '../shared/clients/table';
import {Card, CardContent} from '../ui/card';

interface Props {
	storeId: string;
	clients: Client[];
}

const StoreClients: FC<Props> = ({storeId, clients}) => {
	const {data: fetchedClients} = useStoreClients({storeId, clients});

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<Card x-chunk='dashboard-05-chunk-3' className='w-full'>
					<CardContent className='px-7'>
						<ClientsTable
							clients={fetchedClients}
							title='Store Clients Overview'
							subtitle='A comprehensive list of all registered clients and their details.'
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default StoreClients;
