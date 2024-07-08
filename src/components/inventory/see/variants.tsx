import SeeProductHeader from './header';
import SeeProductVariants from './variant';

const ViewProductVariantsComponent = () => {
	return (
		<div className='grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
			<SeeProductHeader hide />
			<SeeProductVariants />
		</div>
	);
};

export default ViewProductVariantsComponent;
