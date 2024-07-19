import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import {getStorePeriodSales} from '@/services/page/stores/store/period-sales';
import {Period} from '@/services/receipts/businessperiod';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicPeriodSales = dynamic(() => import('../../../../../components/store/period-sales'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const PeriodSalesPage = async ({params}: {params: {id: string}}) => {
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

	const allReceipts = getStorePeriodSales({
		token,
		storeId,
		period: Period.alltime,
	});

	const [day, week, month, year, all] = await Promise.all([
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		allReceipts,
	]);

	return (
		<DynamicPeriodSales
			receiptsDay={day}
			receiptsWeek={week}
			receiptsMonth={month}
			receiptsYear={year}
			allReceipts={all}
			storeId={storeId}
		/>
	);
};

export default PeriodSalesPage;
