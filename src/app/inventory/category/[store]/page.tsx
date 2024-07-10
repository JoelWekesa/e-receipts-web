import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import CategoryIndex from '@/components/inventory/category';
import InventoryLayout from '@/components/inventory/inventory-layout';
import InventoryClient from '@/config/axios-inventory';
import {getServerSession} from 'next-auth';

const getCategories = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({
		token,
	})
		.get(`category/all?storeId=${storeId}`)
		.then((res) => res.data);

	return response;
};

const CategoryPage = async ({params}: {params: {store: string}}) => {
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
				<InventoryLayout storeId={storeId}>
					<CategoryIndex data={{categories, storeId}} />
				</InventoryLayout>
			</div>
		</>
	);
};

export default CategoryPage;
