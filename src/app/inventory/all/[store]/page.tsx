import {options} from '@/app/api/auth/[...nextauth]/options';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import StoreInventory from '@/components/inventory/store/inventory';
import InventoryClient from '@/config/axios-inventory';
import {getServerSession} from 'next-auth';

const getInventory = async ({storeId, token}: {storeId: string; token: string}) => {
	const response = await InventoryClient({token})
		.get(`inventory/store?storeId=${storeId}`)
		.then((res) => res.data);
	return response;
};

const AllInventory = async ({params}: {params: {store: string}}) => {
	const storeId = params.store;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const inventory = await getInventory({storeId, token});

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
				<StoreInventory data={inventory} />
			</div>
		</>
	);
};

export default AllInventory;
