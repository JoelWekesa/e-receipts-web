import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreCashStatementsComponent from '@/components/statements/cash';
import {getStoreCash} from '@/services/page/float/cash';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import getCashStatements from '@/services/page/float/statements';
import {getServerSession} from 'next-auth';
import React, {FC} from 'react';
import dayjs from 'dayjs';
interface Props {
	params: {
		id: string;
	};
}

const StoreCashStatement: FC<Props> = async ({params: {id: storeId}}) => {
	const startDate = dayjs().startOf('month').startOf('day').toISOString();
	const endDate = dayjs().endOf('month').endOf('day').toISOString();

	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const float = getStoreFloat({storeId, token});

	const cash = getStoreCash({storeId, token});

	const cashStatement = getCashStatements({storeId, token, startDate, endDate});

	const [storeFloat, storeCash, statements] = await Promise.all([float, cash, cashStatement]);

	return (
		<div className='container mx-auto'>
			<StoreCashStatementsComponent
				statements={statements}
				storeId={storeId}
				token={token}
				storeCash={storeCash}
				storeFloat={storeFloat}
			/>
		</div>
	);
};

export default StoreCashStatement;
