import {MainNav} from '@/components/dashboard/MainNav';
import {SalesDashboard} from '@/components/dashboard/Sales';
import TeamSwitcher from '@/components/dashboard/TeamSwitcher';
import axios from '@/config/axios';
import {Period} from '@/services/receipts/businessperiod';
import {auth} from '@clerk/nextjs';

const durations = [Period.day, Period.week, Period.month, Period.year, Period.alltime];

const periodTotalsUrls = durations.map(
	(duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/periodtotals?period=' + duration
);

const receiptPeriodUrls = durations.map(
	(duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/store?period=' + duration
);

const countPeriodUrls = durations.map(
	(duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/countall?period=' + duration
);

const topUrls = [
	process.env.NEXT_PUBLIC_API_URL + 'receipts/topstores',
	process.env.NEXT_PUBLIC_API_URL + 'receipts/topcustomersvolume',
];

const allUrls = [...periodTotalsUrls, ...receiptPeriodUrls, ...countPeriodUrls, ...topUrls];

async function getData({token, url}: {token: string; url: string}) {
	const response = await axios
		.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => res.data);

	return response;
}

const getAllData = async ({token}: {token: string}) => {
	const [
		total_daily,
		total_weekly,
		total_monthly,
		total_yearly,
		alltime,
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		allReceipts,
		todayCount,
		weekCount,
		monthCount,
		yearCount,
		alltimeCount,
		topStores,
		topCustomers,
	] = await Promise.all(allUrls.map((url) => getData({token, url})));

	return {
		total_daily,
		total_weekly,
		total_monthly,
		total_yearly,
		alltime,
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		allReceipts,
		todayCount,
		weekCount,
		monthCount,
		yearCount,
		alltimeCount,
		topStores,
		topCustomers,
	};
};

const Sales = async () => {
	const {sessionId: token} = auth();

	const data = await getAllData({
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
				<SalesDashboard data={data} />
			</div>
		</>
	);
};

export default Sales;
