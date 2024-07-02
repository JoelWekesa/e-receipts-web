import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import AddProduct from '@/components/inventory/add';
import React from 'react';

const AddInventoryPage = () => {
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
				<AddProduct />
			</div>
		</>
	);
};

export default AddInventoryPage;
