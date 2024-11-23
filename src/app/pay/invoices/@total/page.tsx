import {options} from '@/app/api/auth/[...nextauth]/options';
import InvoiceBalance from '@/components/billing/invoices/balance';
import getBillingAccount from '@/services/page/billing/account';
import unpaidInvoices from '@/services/page/billing/unpaid';
import {getServerSession} from 'next-auth';
import React from 'react';

const TotalUnpaidInvoicesPage = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const account = await getBillingAccount({token});

	const unpaid = await unpaidInvoices({token, billingAccountId: account.id});

	return (
		<div>
			<InvoiceBalance unpaid={unpaid} token={token} account={account} />
		</div>
	);
};

export default TotalUnpaidInvoicesPage;
