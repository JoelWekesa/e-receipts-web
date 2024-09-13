import React, {FC} from 'react';
import FloatBalance from './float-balance';
import CashBalance from './cash-balance';
import {StoreCash, StoreFloat} from '@/models/floats/store';

interface Props {
	storeFloat: StoreFloat | null;
	storeCash: StoreCash | null;
	storeId: string;
	team?: boolean;
}

const Balances: FC<Props> = ({storeCash, storeFloat, storeId, team}) => {
	return (
		<div className='flex flex-row gap-2'>
			<FloatBalance storeFloat={storeFloat} storeId={storeId} team={team} />
			<CashBalance storeCash={storeCash} storeId={storeId} team={team} />
		</div>
	);
};

export default Balances;
