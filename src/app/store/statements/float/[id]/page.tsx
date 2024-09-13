import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreFloatStatementsComponent from '@/components/statements/float';
import {getStoreCash} from '@/services/page/float/cash';
import getStoreFloatStatements from '@/services/page/float/float-statements';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getServerSession} from 'next-auth';
import {FC} from 'react';
interface Props {
	params: {
		id: string;
	};
}

const StoreFloatStatement: FC<Props> = async ({params: {id: storeId}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const float = getStoreFloat({storeId, token});

	const cash = getStoreCash({storeId, token});

	const floatStatement = getStoreFloatStatements({storeId, token});

	const [storeFloat, storeCash, statements] = await Promise.all([float, cash, floatStatement]);

	return (
		<div className='container mx-auto'>
			<StoreFloatStatementsComponent
				statements={statements}
				storeId={storeId}
				token={token}
				storeCash={storeCash}
				storeFloat={storeFloat}
			/>
		</div>
	);
};

export default StoreFloatStatement;
