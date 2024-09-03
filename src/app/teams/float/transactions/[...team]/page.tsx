import {options} from '@/app/api/auth/[...nextauth]/options';
import StoreTransactionsComponent from '@/components/float/transaction/table';
import {getStoreFloat} from '@/services/page/float/get-store-float';
import {getStoreTransactions} from '@/services/page/float/transactions';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {FC} from 'react';

interface Props {
	params: {
		team: string[];
	};
}

const StoreFloatTransactions: FC<Props> = async ({params: {team}}) => {
	const teamId = team[0];
	const storeId = team[1];
	try {
		const session = await getServerSession(options);

		const token = session?.accessToken || '';

		const float = getStoreFloat({storeId, token});

		const storeTransactions = getStoreTransactions({storeId, token});

		const [storeFloat, transactions] = await Promise.all([float, storeTransactions]);

		return (
			<div className='container mx-auto my-4'>
				<StoreTransactionsComponent storeFloat={storeFloat} transactions={transactions} storeId={storeId} teamId={teamId} />
			</div>
		);
	} catch (error) {
		redirect(`/teams/store/float/${teamId}/${storeId}`);
	}
};

export default StoreFloatTransactions;
