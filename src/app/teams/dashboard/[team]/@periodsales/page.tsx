import {options} from '@/app/api/auth/[...nextauth]/options';
import StorePeriodSales from '@/components/store/period-sales';
import {getStore} from '@/services/page/stores/store/get-store';
import {getCustomStorePeriodSales, getStorePeriodSales} from '@/services/page/stores/store/period-sales';
import {getStoreFromTeam} from '@/services/page/teams/store-from-team';
import {Period} from '@/services/receipts/businessperiod';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {getServerSession} from 'next-auth';
dayjs.extend(quarterOfYear);

const PeriodSalesPage = async (props: {params: Promise<{team: string}>}) => {
    const params = await props.params;
    const session = await getServerSession(options);
    const token = session?.accessToken || '';

    const id = params.team;

    const storeFromTeam = await getStoreFromTeam({
		id,
		token,
	});

    const storeId = storeFromTeam?.store?.id || '';

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

    const [day, week, month, year, all, custom, store] = await Promise.all([
		receiptsDay,
		receiptsWeek,
		receiptsMonth,
		receiptsYear,
		customReceipts,
		allReceipts,
		str,
	]);

    return (
		<StorePeriodSales
			receiptsDay={day}
			receiptsWeek={week}
			receiptsMonth={month}
			receiptsYear={year}
			customPeriodSales={custom}
			allReceipts={all}
			store={store}
			isTeam
			teamId={id}
		/>
	);
};

export default PeriodSalesPage;
