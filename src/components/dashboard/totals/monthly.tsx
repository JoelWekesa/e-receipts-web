'use client';
import {DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {Totals} from '@/models/receipts/totals';
import {Period} from '@/services/receipts/businessperiod';
import useTotals from '@/services/receipts/totals';
import currencyFormat from '@/utils/currency';
import React, {FC} from 'react';
import dayjs from 'dayjs';

const MonthlyTotal: FC<{monthly: Totals}> = ({monthly}) => {
	const {data} = useTotals({
		period: Period.month,
		totals: monthly,
	});

	return (
		<DropdownMenuItem>
			{dayjs().format('MMMM')} Sales - {currencyFormat.format(data.currentTotal)}
		</DropdownMenuItem>
	);
};

export default MonthlyTotal;
