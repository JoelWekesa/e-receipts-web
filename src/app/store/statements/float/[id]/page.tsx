import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreFloatStatementsComponent from '@/components/statements/float';
import {getStoreCash} from '@/services/page/float/cash';
import getStoreFloatStatements from '@/services/page/float/float-statements';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import dayjs from 'dayjs';
import {getServerSession} from 'next-auth';
import {FC} from 'react';

type Params = Promise<{id: string}>;

const StoreFloatStatement: FC<{params: Params}> = async ({params}) => {
	const {id: storeId} = await params;

	const startDate = dayjs().startOf('month').startOf('day').toISOString();
	const endDate = dayjs().endOf('month').endOf('day').toISOString();

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const float = getStoreFloat({storeId, token});

	const cash = getStoreCash({storeId, token});

	const floatStatement = getStoreFloatStatements({storeId, token, startDate, endDate});

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
