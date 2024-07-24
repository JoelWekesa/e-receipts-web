'use client';
import {Client} from '@/models/clients/clients';
import useAllClients from '@/services/clients/all';
import {FC} from 'react';
import ClientsTable from '../shared/clients/table';
import {Card, CardContent} from '../ui/card';

interface Props {
	clients: Client[];
}

const AllClients: FC<Props> = ({clients}) => {
	const {data: fetchedClients} = useAllClients({clients});

	return (
		<div className='flex min-h-screen w-full flex-col'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<Card x-chunk='dashboard-05-chunk-3' className='w-full'>
					<CardContent className='px-7'>
						<ClientsTable
							clients={fetchedClients}
							title='Clients Overview'
							subtitle='A comprehensive list of all registered clients and their details.'
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AllClients;
