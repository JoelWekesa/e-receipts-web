import {options} from '@/app/api/auth/[...nextauth]/options';
import InvoiceComponent from '@/components/billing/invoices/invoice';
import getBillingAccount from '@/services/page/billing/account';
import getInvoice from '@/services/page/billing/invoice';
import {getServerSession} from 'next-auth';
interface Params {
	id: string;
}

const Invoice = async (props: {params: Promise<Params>}) => {
	const {id} = await props.params;
	const session = await getServerSession(options);

	const token = session?.accessToken || '';

	const inv = getInvoice({token, id});
	const acc = getBillingAccount({token});

	const [invoice, account] = await Promise.all([inv, acc]);

	return (
		<div className='container mx-auto my-5'>
			<InvoiceComponent invoice={invoice} token={token} account={account} />
		</div>
	);
};

export default Invoice;
