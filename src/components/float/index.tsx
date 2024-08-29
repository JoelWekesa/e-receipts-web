'use client';
import {StoreFloat} from '@/models/floats/store';
import {FloatTopUp} from '@/models/floats/top-up';
import useFloatTopUps from '@/services/float/top-ups';
import React, {FC} from 'react';
import StoreFloatTopUps from './topups';
import StoreFloatOnboardingScreen from './onboarding';
import useStoreFloat from '@/services/float/store-float';
import {useSession} from 'next-auth/react';

interface Props {
	storeFloat: StoreFloat | null;
	topUps: FloatTopUp[];
	storeId: string;
}

const FloatManagementComponent: FC<Props> = ({storeFloat, topUps, storeId}) => {
	const {data: session} = useSession({
		required: true,
	});

	const token = session?.accessToken || '';
	const {data = []} = useFloatTopUps({floatId: storeFloat?.id || '', topUps});
	const {data: float} = useStoreFloat({token, storeId, storeFloat});

	return (
		<>
			{data.length > 0 ? (
				<StoreFloatTopUps topUps={data} storeFloat={float} storeId={storeId} />
			) : (
				<StoreFloatOnboardingScreen storeFloat={float} />
			)}
		</>
	);
};

export default FloatManagementComponent;
