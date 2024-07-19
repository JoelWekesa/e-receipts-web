import {options} from '@/app/api/auth/[...nextauth]/options';
import {Skeleton} from '@/components/ui/skeleton';
import {storeReceiptsCount} from '@/services/page/stores/store/receipt-count';
import {durations} from '@/utils/durations';
import {getServerSession} from 'next-auth';
import dynamic from 'next/dynamic';

const DynamicReceiptsDistribution = dynamic(() => import('../../../../../components/store/sales'), {
	loading: () => <Skeleton className='h-10 w-full' />,
});

const Receipts = async ({params}: {params: {id: string}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const storeId = params.id;

	const [today, week, month, year, alltime] = await Promise.all(
		durations.map((period) => storeReceiptsCount({storeId, period, token}))
	);

	return (
		<DynamicReceiptsDistribution
			todayCount={today}
			weekCount={week}
			monthCount={month}
			yearCount={year}
			alltimeCount={alltime}
			storeId={storeId}
		/>
	);
};

export default Receipts;
