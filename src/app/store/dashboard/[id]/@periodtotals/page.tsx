import {options} from '@/app/api/auth/[...nextauth]/options';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {getStore} from '@/services/page/stores/store/get-store';
import {getStorePeriodTotals} from '@/services/page/stores/store/period-totals';
import {Period} from '@/services/receipts/businessperiod';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicStoreTimeTotal = dynamic(() => import('../../../../../components/store/totals'), {
	loading: () => <Skeleton />,
});

const PeriodTotals = async ({params}: {params: {id: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const storeId = params.id;

	const weeklySales = getStorePeriodTotals({
		token,
		storeId,
		period: Period.week,
	});

	const dailySales = getStorePeriodTotals({
		token,
		storeId,
		period: Period.day,
	});

	const cStore = getStore({
		id: storeId,
		token,
	});

	const [weekly, daily, store] = await Promise.all([weeklySales, dailySales, cStore]);

	return (
		<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
			<Card className='sm:col-span-2' x-chunk='dashboard-05-chunk-0'>
				<CardHeader className='pb-3'>
					<CardTitle>{store.displayName}</CardTitle>
					<CardDescription className='max-w-lg text-balance leading-relaxed'>
						Introducing our sleek, streamlined dashboard: Your one-stop destination for all your business digital receipts.
					</CardDescription>
				</CardHeader>
			</Card>
			<DynamicStoreTimeTotal
				period={Period.day}
				totals={daily}
				storeId={storeId}
				title='Today'
				subTitle='today'
				subTitle1='yesterday'
			/>
			<DynamicStoreTimeTotal
				period={Period.week}
				totals={weekly}
				storeId={storeId}
				title='This Week'
				subTitle='this week'
				subTitle1='last week'
			/>
		</div>
	);
};

export default PeriodTotals;
