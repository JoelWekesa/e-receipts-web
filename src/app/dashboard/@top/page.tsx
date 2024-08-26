import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import ApiClient from '@/config/axios';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const topUrls = [
	process.env.NEXT_PUBLIC_API_URL + 'receipts/topstores',
	process.env.NEXT_PUBLIC_API_URL + 'receipts/topcustomersvolume',
];

async function getData({token, url}: {token: string; url: string}) {
	const response = await ApiClient(token)
		.get(url)
		.then((res) => res.data);

	return response;
}

const getAllData = async ({token}: {token: string}) => {
	const [topStores, topCustomers] = await Promise.all(topUrls.map((url) => getData({token, url})));

	return {topStores, topCustomers};
};

const DynamicTopsComponent = dynamic(() => import('../../../components/dashboard/top/tops'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const Top = async () => {
	const session = await getServerSession(options);

	console.log({id: session?.accessToken});

	const data = await getAllData({
		token: session?.accessToken || '',
	});

	return <DynamicTopsComponent topStores={data.topStores} topCustomers={data.topCustomers} />;
};

export default Top;
