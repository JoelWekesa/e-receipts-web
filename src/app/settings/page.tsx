import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import SettingsComponent from '@/components/settings/settings';
import {Setting} from '@/models/setting';
import {Store} from '@/models/store';
import {auth} from '@clerk/nextjs';
import axios from 'axios';

async function getData({token}: {token: string}) {
	const setting: Promise<Setting> = axios
		.get(process.env.NEXT_PUBLIC_API_URL + 'settings', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);
	const store: Promise<Store[]> = axios
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/stores', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);

	const [settingRes, storeRes] = await Promise.all([setting, store]);

	return {setting: settingRes, stores: storeRes};
}

const Settings = async () => {
	const {sessionId: token} = auth();

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
				<SettingsComponent stores={stores} setting={setting} />
			</div>
		</>
	);
};

export default Settings;
