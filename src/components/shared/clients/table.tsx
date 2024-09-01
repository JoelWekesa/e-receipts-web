import {Client} from '@/models/clients/clients';
import {ColumnDef} from '@tanstack/react-table';
import {FC} from 'react';
import {DataTable} from '../datatable';
import CopyItem from '../copy';

const columns: ColumnDef<Client>[] = [
	{
		header: () => <div className='flex'>Name</div>,
		accessorKey: 'name',
		cell: ({row}) => <div className='flex'>{row.original.name}</div>,
	},

	{
		header: () => <div className='flex'>Phone</div>,
		accessorKey: 'phone',
		cell: ({row}) => (
			<div className='flex cursor-pointer'>
				<div className='flex flex-row gap-2'>
					<a href={`tel:${row.original.phone}`} className='flex flex-row gap-2'>
						<span>{row.original.phone}</span>
					</a>
					<CopyItem copy={row.original.phone} />
				</div>
			</div>
		),
	},

	{
		header: () => <div className='flex'>Email</div>,
		accessorKey: 'email',
		cell: ({row}) => (
			<div className='flex cursor-pointer'>
				{row.original?.email ? (
					<div className='flex flex-row gap-2'>
						<a href={`mailto:${row.original.email}`} className='flex flex-row gap-2'>
							<span>{row.original.email}</span>
						</a>
						<CopyItem copy={row.original.email} />
					</div>
				) : (
					'N/A'
				)}
			</div>
		),
	},
];

interface Props {
	clients: Client[];
	title: string;
	subtitle: string;
}

const ClientsTable: FC<Props> = ({clients, title, subtitle}) => {
	return (
		<div className='p-2'>
			<DataTable
				columns={columns}
				data={clients}
				searchPlaceholder='Search by client Name'
				black
				title={title}
				subtitle={subtitle}
			/>
		</div>
	);
};

export default ClientsTable;
