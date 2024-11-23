import PaymentClient from "@/config/axios-payments"
import { Invoices } from "@/models/billing/invoices"

const getInvoices = async ({ token }: { token: string }) => {
    const response: Invoices[] = await PaymentClient({ token }).get("billing/invoices").then(res => res.data)

    return response
}

export default getInvoices