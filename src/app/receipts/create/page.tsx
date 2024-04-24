import {PreviewBox} from '@/components/templates/supermarket/show';
import axios from '@/config/axios';
import {Setting} from '@/models/setting';
import {Store} from '@/models/store';
import {auth} from '@clerk/nextjs';

interface GetData {
	id?: string;
	token: string;
}

async function getData({id, token}: GetData): Promise<Store> {
	let val: string = '';

	if (id !== undefined) {
		val = '' + id;
	} else {
		const def: Setting = await axios
			.get(process.env.NEXT_PUBLIC_API_URL + 'settings', {
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

		val = def?.storeId || '';
	}

	const res = await axios
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/store?id=' + val, {
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

const StoresPage = async ({searchParams}: {searchParams: {[key: string]: string | string[] | undefined}}) => {
	const {sessionId: token} = auth();

	const id = searchParams?.id;

	const data = await getData({
		token: token ? token : '',
		id: id as string,
	});

	return (
		<div className='p-3'>
			<PreviewBox store={data} />
		</div>
	);
};

export default StoresPage;
