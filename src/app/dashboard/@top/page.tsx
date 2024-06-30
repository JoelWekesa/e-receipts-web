import {options} from '@/app/api/auth/[...nextauth]/options';
import TopsComponent from '@/components/dashboard/top/tops';
import ApiClient from '@/config/axios';
import {getServerSession} from 'next-auth';
import React from 'react';

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

const Top = async () => {
	const session = await getServerSession(options);

	const data = await getAllData({
		token: session?.accessToken || '',
	});

	return <TopsComponent topStores={data.topStores} topCustomers={data.topCustomers} />;
};

export default Top;
