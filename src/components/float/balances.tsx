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
		<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<FloatBalance storeFloat={storeFloat} storeId={storeId} team={team} />
			<CashBalance storeCash={storeCash} storeId={storeId} team={team} />
		</div>
	);
};

export default Balances;
