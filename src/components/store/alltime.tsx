'use client';
import {Button} from '@/components/ui/button';
import {CardDescription, CardTitle} from '@/components/ui/card';
import {Totals} from '@/models/receipts/totals';
import useStorePeriodTotals from '@/services/store/period-totals';
import currencyFormat from '@/utils/currency';
import {Copy} from 'lucide-react';
import {FC} from 'react';

interface Props {
	period: string;
	storeId: string;
	totals: Totals;
}

const StoreAllTimeTotal: FC<Props> = ({period, storeId, totals}) => {
	const {data} = useStorePeriodTotals({
		period,
		storeId,
		totals,
	});
	return (
		<div className='grid gap-0.5'>
			<CardTitle className='group flex items-center gap-2 text-lg'>
				All time sales
				<Button size='icon' variant='outline' className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'>
					<Copy className='h-3 w-3' />
					<span className='sr-only'>Copy Amount</span>
				</Button>
			</CardTitle>
			<CardDescription>{currencyFormat.format(data.currentTotal)}</CardDescription>
		</div>
	);
};

export default StoreAllTimeTotal;
