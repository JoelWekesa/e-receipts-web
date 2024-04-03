import {MainNav} from '@/components/dashboard/MainNav';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import UserStores from '@/components/stores/user';
import {Store} from '@/models/store';
import {auth} from '@clerk/nextjs';
import axios from 'axios';

async function getData({token}: {token: string}): Promise<Store[]> {
	const res = await axios
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/stores', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err);
		});

	return res;
}

const StoresPage = async () => {
	const {sessionId: token} = auth();

	const data = await getData({
		token: token ? token : '',
	});

	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='border-b'>
					<div className='flex h-16 items-center px-4'>
						<TeamSwitcher />
						<MainNav className='mx-6' />
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<UserStores initialData={data} />
			</div>
		</>
	);
};

export default StoresPage;
