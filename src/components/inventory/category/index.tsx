import {Category} from '@/models/inventory/category';
import {FC} from 'react';
import AddCategory from './add';
import CategoriesTable from './all';
export interface CategoryProps {
	storeId: string;
	categories: Category[];
}

const CategoryIndex: FC<{data: CategoryProps}> = ({data: {categories, storeId}}) => {
	return (
		<div className='flex w-full flex-col'>
			<div className='flex flex-col sm:gap-1 sm:py-1 sm:pl-1'>
				<main className='flex-1 items-start gap-4 sm:px-1 sm:py-0 md:gap-8'>
					<div className='mx-auto flex-1 auto-rows-max gap-4'>
						<AddCategory storeId={storeId} />
						<CategoriesTable category={categories} storeId={storeId} />
					</div>
				</main>
			</div>
		</div>
	);
};

export default CategoryIndex;
