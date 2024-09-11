import React, {FC} from 'react';
import FloatBalance from './float-balance';
import CashBalance from './cash-balance';
import {StoreCash, StoreFloat} from '@/models/floats/store';

interface Props {
	storeFloat: StoreFloat | null;
	storeCash: StoreCash | null;
	storeId: string;
}

const Balances: FC<Props> = ({ storeCash, storeFloat, storeId}) => {
	return (
		<div className='flex flex-row gap-2'>
			<FloatBalance storeFloat={storeFloat} storeId={storeId} />
			<CashBalance storeCash={storeCash} storeId={storeId} />
		</div>
	);
};

export default Balances;
