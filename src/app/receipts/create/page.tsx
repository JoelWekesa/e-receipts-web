import {options} from '@/app/api/auth/[...nextauth]/options';
import {PreviewBox} from '@/components/templates/supermarket/show';
import ApiClient from '@/config/axios';
import InventoryClient from '@/config/axios-inventory';
import {Product} from '@/models/inventory/product';
import {Setting} from '@/models/setting';
import {Store} from '@/models/store';
import {getSetting} from '@/services/page/settings/get-setting';
import {getServerSession} from 'next-auth';

interface GetData {
	id?: string;
	token: string;
}

async function getData({id, token}: GetData): Promise<Store> {
	let val: string = '';

	if (id !== undefined) {
		val = '' + id;
	} else {
		const def: Setting = await ApiClient(token)
			.get(process.env.NEXT_PUBLIC_API_URL + 'settings')
			.then((res) => res.data)
			.catch((err) => {
				throw new Error(err);
			});

		val = def?.storeId || '';
	}

	const res = await ApiClient(token)
		.get(process.env.NEXT_PUBLIC_API_URL + 'stores/store?id=' + val)
		.then((res) => res.data)
		.catch((err) => {
			throw new Error(err);
		});

	return res;
}

const getStoresProduct = async ({token, storeId}: {token: string; storeId: string}) => {
	const products: Product[] = await InventoryClient({
		token,
	})
		.get(`inventory/store/variants?storeId=${storeId}`)
		.then((res) => res.data);

	return products;
};

const StoresPage = async ({searchParams}: {searchParams: {[key: string]: string | string[] | undefined}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	console.log({token});

	const setting = await getSetting(token);

	const id = searchParams?.id || setting?.storeId;

	const [data, products] = await Promise.all([
		getData({
			id: id as string,
			token: token,
		}),

		getStoresProduct({token: token, storeId: id as string}),
	]);

	return (
		<div className='p-3'>
			<PreviewBox store={data} token={token} products={products} />
		</div>
	);
};

export default StoresPage;
