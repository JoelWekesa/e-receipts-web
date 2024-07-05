import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import SettingsComponent from '@/components/settings/settings';
import ApiClient from '@/config/axios';
import {Setting} from '@/models/setting';
import {Store} from '@/models/store';
import {getServerSession} from 'next-auth';
import {options} from '../api/auth/[...nextauth]/options';

async function getData({token}: {token: string}) {
	const setting: Promise<Setting> = ApiClient(token)
		.get(process.env.NEXT_PUBLIC_API_URL + 'settings')
		.then((res) => res.data);
	const store: Promise<Store[]> = ApiClient(token)
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/stores')
		.then((res) => res.data);

	const [settingRes, storeRes] = await Promise.all([setting, store]);

	return {setting: settingRes, stores: storeRes};
}

const Settings = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken;

	const {setting, stores} = await getData({
		token: token ? token : '',
	});
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
				<SettingsComponent stores={stores} setting={setting} token={token ? token : ''} />
			</div>
		</>
	);
};

export default Settings;
