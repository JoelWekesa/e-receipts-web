import {Count} from '@/models/receipts/count';
import {FC} from 'react';

const ReceiptDistribution: FC<{
	daily: Count;
	weekly: Count;
	monthly: Count;
	yearly: Count;
	all: Count;
}> = ({daily, weekly, monthly, yearly, all}) => {
	return (
		<ul className='grid gap-3'>
			<li className='flex items-center justify-between'>
				<span className='text-muted-foreground'>Today</span>
				<span>{daily.count}</span>
			</li>
			<li className='flex items-center justify-between'>
				<span className='text-muted-foreground'>This Week</span>
				<span>{weekly.count}</span>
			</li>
			<li className='flex items-center justify-between'>
				<span className='text-muted-foreground'>This Month</span>
				<span>{monthly.count}</span>
			</li>
			<li className='flex items-center justify-between'>
				<span className='text-muted-foreground'>This year</span>
				<span>{yearly.count}</span>
			</li>

			<li className='flex items-center justify-between'>
				<span className='text-muted-foreground'>All Time</span>
				<span>{all.count}</span>
			</li>
		</ul>
	);
};

export default ReceiptDistribution;
