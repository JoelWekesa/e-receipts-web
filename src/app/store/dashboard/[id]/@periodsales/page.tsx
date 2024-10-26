import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import {getStore} from '@/services/page/stores/store/get-store';
import {getCustomStorePeriodSales, getStorePeriodSales} from '@/services/page/stores/store/period-sales';
import {Period} from '@/services/receipts/businessperiod';
import dayjs from 'dayjs';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear);

const DynamicPeriodSales = dynamic(() => import('../../../../../components/store/period-sales'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const PeriodSalesPage = async (props: {params: Promise<{id: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);
    const token = session?.accessToken || '';

    const storeId = params.id;

    const receiptsDay = getStorePeriodSales({
		token,
		storeId,
		period: Period.day,
	});

    const receiptsWeek = getStorePeriodSales({
		token,
		storeId,
		period: Period.week,
	});

    const receiptsMonth = getStorePeriodSales({
		token,
		storeId,
		period: Period.month,
	});

    const receiptsYear = getStorePeriodSales({
		token,
		storeId,
		period: Period.year,
	});

    const customReceipts = getCustomStorePeriodSales({
		token,
		period: Period.custom,
		startDate: dayjs(new Date()).startOf('Q').format('YYYY-MM-DD'),
		endDate: dayjs(new Date()).endOf('Q').format('YYYY-MM-DD'),
		storeId,
	});

    const allReceipts = getStorePeriodSales({
		token,
		storeId,
		period: Period.alltime,
	});

    const str = getStore({token, id: storeId});

    const [day, week, month, year, custom, all, store] = await Promise.all([
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		customReceipts,
		allReceipts,
		str,
	]);

    return (
		<DynamicPeriodSales
			receiptsDay={day}
			receiptsWeek={week}
			receiptsMonth={month}
			receiptsYear={year}
			customPeriodSales={custom}
			allReceipts={all}
			store={store}
		/>
	);
};

export default PeriodSalesPage;
