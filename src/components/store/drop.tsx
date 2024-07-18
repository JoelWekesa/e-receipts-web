'use client';

import {DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {Totals} from '@/models/receipts/totals';
import {Period} from '@/services/receipts/businessperiod';
import useStorePeriodTotals from '@/services/store/period-totals';
import currencyFormat from '@/utils/currency';
import dayjs from 'dayjs';
import {FC} from 'react';

interface Props {
	period: string;
	storeId: string;
	totals: Totals;
}

const StoreDropTotal: FC<Props> = ({period, storeId, totals}) => {
	const {data} = useStorePeriodTotals({
		period,
		storeId,
		totals,
	});

	return (
		<DropdownMenuItem>
			{period === Period.year
				? `${new Date().getFullYear()} Sales - ${currencyFormat.format(data.currentTotal)}`
				: `${dayjs(new Date()).format('MMM')} Sales - ${currencyFormat.format(data.currentTotal)}`}
		</DropdownMenuItem>
	);
};

export default StoreDropTotal;
