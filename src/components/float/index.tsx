'use client';
import {CashTopUp} from '@/models/floats/cash-topups';
import {StoreCash, StoreFloat} from '@/models/floats/store';
import {FloatTopUp} from '@/models/floats/top-up';
import useCashTopUps from '@/services/float/cashTopUps';
import useStoreFloat from '@/services/float/store-float';
import useFloatTopUps from '@/services/float/top-ups';
import {useSession} from 'next-auth/react';
import {FC} from 'react';
import Balances from './balances';
import StoreFloatOnboardingScreen from './onboarding';
import TopUpsTabs from './tabs';
import useStoreCash from '@/services/float/cash';

interface Props {
	storeFloat: StoreFloat | null;
	topUps: FloatTopUp[];
	cashTopUps: CashTopUp[];
	storeId: string;
	teamId?: string;
	storeCash: StoreCash | null;
}

const FloatManagementComponent: FC<Props> = ({storeFloat, topUps, storeId, storeCash, cashTopUps}) => {
	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';

	const {data: float} = useStoreFloat({token, storeId, storeFloat});

	const {data: cash} = useStoreCash({storeId, storeCash});

	const {data = []} = useFloatTopUps({floatId: float?.id || '', topUps});

	const {data: cTopUps = []} = useCashTopUps({floatId: float?.id || '', cashTopUps, token});

	return (
		<>
			{data.length > 0 ? (
				<div className='flex flex-col gap-2'>
					{float && <Balances storeFloat={float} storeCash={cash} storeId={storeId} />}
					<TopUpsTabs floatTopUps={data} cashTopUps={cTopUps} />
				</div>
			) : (
				<StoreFloatOnboardingScreen storeFloat={float} storeId={storeId} />
			)}
		</>
	);
};

export default FloatManagementComponent;
