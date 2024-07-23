import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import {customPeriodSales, periodSales} from '@/services/page/sales/periodsales';
import {Period} from '@/services/receipts/businessperiod';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear);

const DynamicPeriodSales = dynamic(() => import('../../../components/dashboard/sales/periodsales'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const getAllData = async ({token}: {token: string}) => {
	const [receiptsDay, receiptsWeek, receiptsMonth, receiptsYear, custom, allReceipts] = await Promise.all([
		periodSales({token, period: Period.day}),
		periodSales({token, period: Period.week}),
		periodSales({token, period: Period.month}),
		periodSales({token, period: Period.year}),
		customPeriodSales({
			token,
			period: Period.custom,
			startDate: dayjs(new Date()).startOf('Q').format('YYYY-MM-DD'),
			endDate: dayjs(new Date()).endOf('Q').format('YYYY-MM-DD'),
		}),
		periodSales({token, period: Period.alltime}),
	]);

	return {
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		custom,
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
			customPeriodSales={data.custom}
		/>
	);
};

export default PeriodSalesPage;
