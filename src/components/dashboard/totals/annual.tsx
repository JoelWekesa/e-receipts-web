'use client';

import {DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {Totals} from '@/models/receipts/totals';
import {Period} from '@/services/receipts/businessperiod';
import useTotals from '@/services/receipts/totals';
import currencyFormat from '@/utils/currency';
import React, {FC} from 'react';

const AnnualTotal: FC<{annual: Totals}> = ({annual}) => {
	const {data} = useTotals({
		period: Period.year,
		totals: annual,
	});

	return (
		<DropdownMenuItem>
			{new Date().getFullYear()} Sales - {currencyFormat.format(data.currentTotal)}
		</DropdownMenuItem>
	);
};

export default AnnualTotal;
