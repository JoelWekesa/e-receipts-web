import React, {FC} from 'react';
import ReceiptDistribution from '../ReceiptDistribution';
import {Separator} from '@radix-ui/react-dropdown-menu';
import {Count} from '@/models/receipts/count';

const ReceiptsDistributionComponent: FC<{
	todayCount: Count;
	weekCount: Count;
	monthCount: Count;
	yearCount: Count;
	alltimeCount: Count;
}> = ({todayCount, weekCount, monthCount, yearCount, alltimeCount}) => {
	return (
		<div className='grid gap-3'>
			<div className='font-semibold'>Receipts Distribution</div>
			<ReceiptDistribution
				todayCount={todayCount}
				weekCount={weekCount}
				monthCount={monthCount}
				yearCount={yearCount}
				alltimeCount={alltimeCount}
			/>
			<Separator className='my-2' />
		</div>
	);
};

export default ReceiptsDistributionComponent;
