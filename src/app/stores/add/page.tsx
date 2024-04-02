import {MainNav} from '@/components/dashboard/MainNav';
import {Search} from '@/components/dashboard/Search';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import StoreHomeComponent from '@/components/stores';

const HomePage = () => {
	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher />
						<MainNav className='mx-6' />
						<div className='ml-auto flex items-center space-x-4'>
							<Search />
						</div>
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<StoreHomeComponent />
			</div>
		</>
	);
};

export default HomePage;
