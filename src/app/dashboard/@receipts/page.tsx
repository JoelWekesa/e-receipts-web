import {options} from '@/app/api/auth/[...nextauth]/options';
import ReceiptsDistributionComponent from '@/components/dashboard/receipts/distribution';
import ApiClient from '@/config/axios';
import {durations} from '@/utils/durations';
import {getServerSession} from 'next-auth';
import React from 'react';

const countPeriodUrls = durations.map(
	(duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/countall?period=' + duration
);

async function getData({token, url}: {token: string; url: string}) {
	const response = await ApiClient(token)
		.get(url)
		.then((res) => res.data);

	return response;
}

const getAllData = async ({token}: {token: string}) => {
	const [total_daily, total_weekly, total_monthly, total_yearly, alltime] = await Promise.all(
		countPeriodUrls.map((url) => getData({token, url}))
	);

	return {
		total_daily,
		total_weekly,
		total_monthly,
		total_yearly,
		alltime,
	};
};

const Receipts = async () => {
	const session = await getServerSession(options);

	const data = await getAllData({
		token: session?.accessToken || '',
	});

	return (
		<ReceiptsDistributionComponent
			todayCount={data.total_daily}
			weekCount={data.total_weekly}
			monthCount={data.total_monthly}
			yearCount={data.total_yearly}
			alltimeCount={data.alltime}
		/>
	);
};

export default Receipts;
