'use client';
import {Count} from '@/models/receipts/count';
import {Separator} from '@radix-ui/react-dropdown-menu';
import {FC} from 'react';
import ReceiptDistribution from '../ReceiptDistribution';
import {useReceiptsDistribution} from '@/services/receipts/distribution';
import {Period} from '@/services/receipts/businessperiod';

const ReceiptsDistributionComponent: FC<{
	todayCount: Count;
	weekCount: Count;
	monthCount: Count;
	yearCount: Count;
	alltimeCount: Count;
}> = ({todayCount, weekCount, monthCount, yearCount, alltimeCount}) => {
	const {data: daily} = useReceiptsDistribution({
		period: Period.day,
		count: todayCount,
	});
	const {data: weekly} = useReceiptsDistribution({
		period: Period.week,
		count: weekCount,
	});
	const {data: monthly} = useReceiptsDistribution({
		period: Period.month,
		count: monthCount,
	});
	const {data: yearly} = useReceiptsDistribution({
		period: Period.year,
		count: yearCount,
	});
	const {data: alltime} = useReceiptsDistribution({
		period: Period.alltime,
		count: alltimeCount,
	});

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
