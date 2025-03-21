'use client';
import {Count} from '@/models/receipts/count';
import {Period} from '@/services/receipts/businessperiod';
import {useReceiptsDistribution} from '@/services/receipts/distribution';
import React, {FC} from 'react';

const ReceiptDistribution: FC<{
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

	const {data: annual} = useReceiptsDistribution({
		period: Period.year,
		count: yearCount,
	});

	const {data: all} = useReceiptsDistribution({
		period: Period.alltime,
		count: alltimeCount,
	});

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
				<span>{annual.count}</span>
			</li>

			<li className='flex items-center justify-between'>
				<span className='text-muted-foreground'>All Time</span>
				<span>{all.count}</span>
			</li>
		</ul>
	);
};

export default ReceiptDistribution;
