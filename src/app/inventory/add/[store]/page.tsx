import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import AddProduct from '@/components/inventory/add';
import {getCategories} from '@/services/inventory/categories/store';
import {getServerSession} from 'next-auth';
import React from 'react';

const AddInventoryPage = async ({params}: {params: {store: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const storeId = params.store;

	const categories = await getCategories({storeId, token});

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
				<AddProduct categories={categories} storeId={storeId} />
			</div>
		</>
	);
};

export default AddInventoryPage;
