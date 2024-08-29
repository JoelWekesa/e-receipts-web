import {options} from '@/app/api/auth/[...nextauth]/options';
import FloatManagementComponent from '@/components/float';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getFloatTopUps} from '@/services/page/float/top-ups';
import {getServerSession} from 'next-auth';

interface Props {
	params: {id: string};
}

const StoreFloat = async ({params: {id: storeId}}: Props) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const storeFloat = await getStoreFloat({token, storeId});

	const floatTopUps = await getFloatTopUps({token, floatId: storeFloat?.id || ''});

	return (
		<div className='container mx-auto my-4'>
			<FloatManagementComponent storeFloat={storeFloat} topUps={floatTopUps} storeId={storeId} />
		</div>
	);
};

export default StoreFloat;
