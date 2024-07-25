import LandingComponent from '@/components/landing';
import {SiteHeader} from '@/components/site-header';
import {getServerSession} from 'next-auth';
import {options} from './api/auth/[...nextauth]/options';

const HomePage = async () => {
	const session = await getServerSession(options);

	console.log({id: session?.accessToken});

	return (
		<>
			<SiteHeader storeId='' />
			<div className='flex-1 space-y-2 pt-6'>
				<LandingComponent />
			</div>
		</>
	);
};

export default HomePage;
