'use client';
import {Count} from '@/models/receipts/count';
import {
	useAllTimeReceiptCount,
	useDailyReceiptCount,
	useMonthlyReceiptCount,
	useWeeklyReceiptCount,
	useYearlyReceiptCount,
} from '@/services/receipts/distribution';
import {Separator} from '@radix-ui/react-dropdown-menu';
import {FC} from 'react';
import ReceiptDistribution from '../ReceiptDistribution';

const ReceiptsDistributionComponent: FC<{
	todayCount: Count;
	weekCount: Count;
	monthCount: Count;
	yearCount: Count;
	alltimeCount: Count;
}> = ({todayCount, weekCount, monthCount, yearCount, alltimeCount}) => {
	const {data: daily} = useDailyReceiptCount(todayCount);
	const {data: weekly} = useWeeklyReceiptCount(weekCount);
	const {data: monthly} = useMonthlyReceiptCount(monthCount);
	const {data: yearly} = useYearlyReceiptCount(yearCount);
	const {data: alltime} = useAllTimeReceiptCount(alltimeCount);

	return (
		<div className='grid gap-3'>
			<div className='font-semibold'>Receipts Distribution</div>
			<ReceiptDistribution
				todayCount={daily}
				weekCount={weekly}
				monthCount={monthly}
				yearCount={yearly}
				alltimeCount={alltime}
			/>
			<Separator className='my-2' />
		</div>
	);
};

export default ReceiptsDistributionComponent;
