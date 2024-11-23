import PaymentClient from "@/config/axios-payments"
import { PayStackAccessCode } from "@/models/paystack/access-code"

interface AccessProps {
    token: string
    invoiceId: string
}


const getPayStackAccessCode = async ({ token, invoiceId }: AccessProps) => {
    const response: PayStackAccessCode = await PaymentClient({ token }).get(`paystack/accesscode?invoiceId=${invoiceId}`).then(res => res.data)

    return response
}

export default getPayStackAccessCode