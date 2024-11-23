import PaymentClient from "@/config/axios-payments"
import { Invoice } from "@/models/billing/invoice"
interface Params {
    token: string
    id: string
}

const getInvoice = async ({ token, id }: Params) => {
    const response: Invoice = await PaymentClient({ token }).get(`billing/invoice?invoiceId=${id}`).then(res => res.data)

    return response
}

export default getInvoice