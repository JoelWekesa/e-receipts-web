import PaymentClient from "@/config/axios-payments"
import { UnpaidInvoices } from "@/models/billing/unpaid"

interface Props {
    token: string
    billingAccountId: string
}
const unpaidInvoices = async ({ token, billingAccountId }: Props) => {
    const response: UnpaidInvoices = await PaymentClient({ token }).get(`billing/unpaid?billingAccountId=${billingAccountId}`).then(res => res.data)

    return response
}

export default unpaidInvoices 