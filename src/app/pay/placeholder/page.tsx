import {options} from '@/app/api/auth/[...nextauth]/options';
import getBillingAccount from '@/services/page/billing/account';
import getInvoices from '@/services/page/billing/invoices';
import unpaidInvoices from '@/services/page/billing/unpaid';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';

const update = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const inv = getInvoices({token});

	const acc = getBillingAccount({token});

	const [account, _] = await Promise.all([acc, inv]);

	await unpaidInvoices({token, billingAccountId: account.id});

	redirect('/pay/invoices');
};

const PlaceholderInvoice = async () => {
	await update();
	return <div></div>;
};

export default PlaceholderInvoice;
