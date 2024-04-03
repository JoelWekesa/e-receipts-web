'use client';
import {searchAtom} from '@/atoms/search';
import searchClient from '@/config/meiliclient';
import {ColumnDef} from '@tanstack/react-table';
import {useAtom} from 'jotai';
import {Hits} from 'meilisearch';
import {useEffect, useState} from 'react';
import {DataTable} from './table';

const AllStores = () => {
	const [search, _] = useAtom(searchAtom);

	const [stores, setStores] = useState<Hits<Record<string, any>>>([]);

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'name',
			header: 'Status',
		},

		{
			accessorKey: 'phone',
			header: 'Phone',
		},

		{
			accessorKey: 'email',
			header: 'Email',
		},

		{
			accessorKey: 'address',
			header: 'Address',
		},
	];

	useEffect(() => {
		const getSearchItems = async () => {
			const value = await searchClient
				.index('stores')
				.search(search, {
					limit: 10,
					offset: 0,
				})
				.then((result) => {
					console.log(result);
					return result.hits;
				});

			setStores(value);
		};

		getSearchItems();
	}, [search]);

	return (
		<div className='flex flex-col gap-5'>
			<div className='p-4'>
				<DataTable columns={columns} data={stores} />
			</div>
		</div>
	);
};

export default AllStores;
