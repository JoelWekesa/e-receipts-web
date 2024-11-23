import PaymentClient from "@/config/axios-payments"
import { BillingAccount } from "@/models/billing/account"

const getBillingAccount = async ({ token }: { token: string }) => {
    const account: BillingAccount = await PaymentClient({ token }).get("billing/account").then(res => res.data)

    return account
}

export default getBillingAccount