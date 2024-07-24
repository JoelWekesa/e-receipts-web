import {options} from '@/app/api/auth/[...nextauth]/options';
import SaleItem from '@/components/shared/sales/item';
import {getSell} from '@/services/page/sales/item';
import {getServerSession} from 'next-auth';
import React from 'react';

const ReceiptPage = async ({params}: {params: {id: string[]}}) => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const {id} = params;

	const receiptId = id[2];

	const receipt = await getSell({id: receiptId, token});

	return (
		<div className='container mx-auto px-5'>
			<SaleItem receipt={receipt} />
		</div>
	);
};

export default ReceiptPage;
