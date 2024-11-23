import {options} from '@/app/api/auth/[...nextauth]/options';
import InvoicesComponent from '@/components/billing/invoices/all';
import getBillingAccount from '@/services/page/billing/account';
import getInvoices from '@/services/page/billing/invoices';
import {getServerSession} from 'next-auth';

const InvoicesPage = async () => {
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const acc = getBillingAccount({token});

	const inv = getInvoices({token});

	const [account, invoices] = await Promise.all([acc, inv]);

	const userId = account.userId;

	return (
		<div>
			<InvoicesComponent
				data={{
					invoices,
					token,
					userId,
				}}
			/>
		</div>
	);
};

export default InvoicesPage;
