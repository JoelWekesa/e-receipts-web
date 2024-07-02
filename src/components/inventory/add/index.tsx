import SelectProductCategory from './category';
import AddProductComponent from './product';
import ProductHeader from './productheader';
import ProductImages from './productimages';
import ProductStatus from './status';
import ProductVariant from './variant';

const AddProduct = () => {
	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
					<div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
						<ProductHeader />
						<div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
							<div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
								<AddProductComponent />
								<SelectProductCategory />
								<ProductVariant />
							</div>
							<div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
								<ProductStatus />
								<ProductImages />
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default AddProduct;
