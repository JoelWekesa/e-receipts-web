import {options} from '@/app/api/auth/[...nextauth]/options';
import TransactionComponent from '@/components/float/transaction/transaction';
import {getStoreTransaction} from '@/services/page/float/transaction';
import {getServerSession} from 'next-auth';
import React, {FC} from 'react';

interface Props {
	params: {
		team: string[];
	};
}

const FloatTransaction: FC<Props> = async ({params: {team}}) => {
	const transactionId = team[1];
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const transaction = await getStoreTransaction({token, transactionId});

	return (
		<div className='container mx-auto my-4'>
			<TransactionComponent transaction={transaction} />
		</div>
	);
};

export default FloatTransaction;
