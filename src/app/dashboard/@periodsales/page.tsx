import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import ApiClient from '@/config/axios';
import {durations} from '@/utils/durations';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicPeriodSales = dynamic(() => import('../../../components/dashboard/sales/periodsales'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const receiptPeriodUrls = durations.map(
	(duration) => process.env.NEXT_PUBLIC_API_URL + 'receipts/store?period=' + duration
);

async function getData({token, url}: {token: string; url: string}) {
	const response = await ApiClient(token)
		.get(url)
		.then((res) => res.data);

	return response;
}

const getAllData = async ({token}: {token: string}) => {
	const [receiptsDay, receiptsWeek, receiptsMonth, receiptsYear, allReceipts] = await Promise.all(
		receiptPeriodUrls.map((url) => getData({token, url}))
	);

	return {
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		allReceipts,
	};
};

const PeriodSalesPage = async () => {
	const session = await getServerSession(options);
	const token = session?.accessToken || '';

	const data = await getAllData({
		token: token,
	});

	return (
		<DynamicPeriodSales
			receiptsDay={data.receiptsDay}
			receiptsWeek={data.receiptsWeek}
			receiptsMonth={data.receiptsMonth}
			receiptsYear={data.receiptsYear}
			allReceipts={data.allReceipts}
		/>
	);
};

export default PeriodSalesPage;
