'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {Totals} from '@/models/receipts/totals';
import {Period} from '@/services/receipts/businessperiod';
import useTotals from '@/services/receipts/totals';
import currencyFormat from '@/utils/currency';
import React, {FC} from 'react';

const WeeklyTotals: FC<{weekly: Totals}> = ({weekly}) => {
	const {data} = useTotals({
		period: Period.week,
		totals: weekly,
	});

	return (
		<Card x-chunk='dashboard-05-chunk-1'>
			<CardHeader className='pb-2'>
				<CardDescription>This Week</CardDescription>
				<CardTitle className='text-base'>{currencyFormat.format(data.currentTotal)}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='text-sm text-muted-foreground'>
					{data.increase > 0
						? `+${(data.increase * 100).toFixed(2)}% increase from last week`
						: data.increase === -1
						? 'No sales made this week'
						: `${(data.increase * 100).toFixed(2)}% decrease from last week`}
				</div>
			</CardContent>
			<CardFooter>
				<Progress value={data.increase * 100} aria-label={data.increase > 0 ? 'Increase' : 'Decrease'} />
			</CardFooter>
		</Card>
	);
};

export default WeeklyTotals;
