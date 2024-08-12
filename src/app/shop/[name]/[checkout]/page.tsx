import {options} from '@/app/api/auth/[...nextauth]/options';
import CheckOutComponent from '@/components/storefront/checkout';
import getShipping from '@/services/page/shipping/get';
import {storeFromName} from '@/services/page/stores/store/store-from-name';
import {getServerSession} from 'next-auth';
import {FC} from 'react';

interface Props {
	params: {
		name: string;
		checkout: string;
	};
}

const CheckOut: FC<Props> = async ({params}) => {
	const {name} = params;

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const ship = getShipping({token});

	const sName = storeFromName({name});

	const [shipping, store] = await Promise.all([ship, sName]);

	return (
		<div>
			<CheckOutComponent shipping={shipping} token={token} storeId={store.id} />
		</div>
	);
};

export default CheckOut;
