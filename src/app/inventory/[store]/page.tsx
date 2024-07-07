import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import InventoryComponent from '@/components/inventory';
import ApiClient from '@/config/axios';
import InventoryClient from '@/config/axios-inventory';
import {getServerSession} from 'next-auth';
import React from 'react';

const getCategories = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({
		token,
	})
		.get(`category/all?storeId=${storeId}`)
		.then((res) => res.data);

	return response;
};

const getStore = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await ApiClient(token)
		.get(`stores/store?id=${storeId}`)
		.then((res) => res.data);
	return response;
};

const getInventory = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const InventoryPage = async ({params}: {params: {store: string}}) => {
	const storeId = params.store;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const [categories, store, inventory] = await Promise.all([
		getCategories({storeId, token}),
		getStore({storeId, token}),
		getInventory({storeId, token}),
	]);

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher />
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-1'>
				<InventoryComponent data={{categoryProps: {categories, storeId}, store, inventory}} />
			</div>
		</>
	);
};

export default InventoryPage;
