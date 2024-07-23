'use client';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {Totals} from '@/models/receipts/totals';
import {Period} from '@/services/receipts/businessperiod';
import useTotals from '@/services/receipts/totals';
import currencyFormat from '@/utils/currency';
import {FC} from 'react';

interface Props {
	totals: Totals;
	period: Period;
	title: string;
	subTitle: string;
	subTitle1: string;
}

const StoresTimeTotal: FC<Props> = ({totals, period, title, subTitle, subTitle1}) => {
	const {data} = useTotals({
		period,
		totals,
	});
	return (
		<Card x-chunk='dashboard-05-chunk-1'>
			<CardHeader className='pb-2'>
				<CardDescription>{title}</CardDescription>
				<CardTitle className='text-base'>{currencyFormat.format(data.currentTotal)}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='text-sm text-muted-foreground'>
					{data.increase > 0 && data.currentTotal > 0
						? `+${(data.increase * 100).toFixed(2)}% increase from ${subTitle1}`
						: data.increase === -1
						? `No sales made ${subTitle}`
						: data.increase > 0 && data.currentTotal === 0
						? `No sales made ${subTitle}`
						: `${(data.increase * 100).toFixed(2)}% decrease from ${subTitle1}`}
				</div>
			</CardContent>
			<CardFooter>
				<Progress
					value={data.currentTotal > 0 ? data.increase * 100 : 0}
					aria-label={data.increase > 0 ? 'Increase' : 'Decrease'}
				/>
			</CardFooter>
		</Card>
	);
};

export default StoresTimeTotal;
