import LandingComponent from '@/components/landing';
import { SiteHeader } from '@/components/site-header';

const HomePage = () => {

	return (
		<>
			<SiteHeader />
			<div className='flex-1 space-y-2 pt-6'>
				<LandingComponent />
			</div>
		</>
	);
};

export default HomePage;
