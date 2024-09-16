import {options} from '@/app/api/auth/[...nextauth]/options';
import FloatManagementComponent from '@/components/float';
import {getStoreCash} from '@/services/page/float/cash';
import getCashTopUps from '@/services/page/float/cash-topups';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getFloatTopUps} from '@/services/page/float/top-ups';
import {getServerSession} from 'next-auth';

interface Props {
	params: {id: string};
}

const StoreFloat = async ({params: {id: storeId}}: Props) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const float = getStoreFloat({token, storeId});

	const cash = getStoreCash({storeId, token});

	const [storeFloat, storeCash] = await Promise.all([float, cash]);

	if (!storeFloat) {
		return (
			<FloatManagementComponent
				storeFloat={storeFloat}
				topUps={[]}
				storeId={storeId}
				storeCash={storeCash}
				cashTopUps={[]}
			/>
		);
	}

	const cTopUps = getCashTopUps({token, floatId: storeFloat?.id || ''});

	const fTopUps = getFloatTopUps({token, floatId: storeFloat?.id || ''});

	const [cashTopUps, floatTopUps] = await Promise.all([cTopUps, fTopUps]);

	return (
		<div className='container mx-auto my-4'>
			<FloatManagementComponent
				storeFloat={storeFloat}
				topUps={floatTopUps}
				storeId={storeId}
				storeCash={storeCash}
				cashTopUps={cashTopUps}
			/>
		</div>
	);
};

export default StoreFloat;
