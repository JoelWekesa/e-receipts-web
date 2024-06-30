import {options} from '@/app/api/auth/[...nextauth]/options';
import {MainNav} from '@/components/dashboard/MainNav';
import {Search} from '@/components/dashboard/Search';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import StoreHomeComponent from '@/components/stores';
import {getServerSession} from 'next-auth';

const HomePage = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken;

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

			{/* <div>{JSON.stringify(session)}</div> */}
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<StoreHomeComponent token={token ? token : ''} />
			</div>
		</>
	);
};

export default HomePage;
