'use client';
import { Count } from '@/models/receipts/count';
import { Period } from '@/services/receipts/businessperiod';
import useStoreReceiptsDistribution from '@/services/store/receipts-distribution';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { FC } from 'react';
import ReceiptDistribution from '../dashboard/ReceiptDistribution';

const StoreSalesComponent: FC<{
	todayCount: Count;
	weekCount: Count;
	monthCount: Count;
	yearCount: Count;
	alltimeCount: Count;
	storeId: string;
}> = ({todayCount, weekCount, monthCount, yearCount, alltimeCount, storeId}) => {
	const {data: daily} = useStoreReceiptsDistribution({
		count: todayCount,
		storeId,
		period: Period.day,
	});
	const {data: weekly} = useStoreReceiptsDistribution({
		count: weekCount,
		storeId,
		period: Period.week,
	});
	const {data: monthly} = useStoreReceiptsDistribution({
		count: monthCount,
		storeId,
		period: Period.month,
	});
	const {data: yearly} = useStoreReceiptsDistribution({
		count: yearCount,
		storeId,
		period: Period.year,
	});
	const {data: alltime} = useStoreReceiptsDistribution({
		count: alltimeCount,
		storeId,
		period: Period.alltime,
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

export default StoreSalesComponent;
