'use client';
import ProductDetails from './details';
import SeeProductHeader from './header';
import SeeProductOptions from './options';
import SeeProductImages from './productimages';
import SeeProductVariants from './variant';

const ViewProductComponent = () => {
	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<SeeProductHeader />
			<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
				<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
					<ProductDetails />
				</div>
				<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
					<SeeProductImages />
				</div>
			</div>
			<SeeProductOptions />
			<SeeProductVariants />
		</div>
	);
};

export default ViewProductComponent;
