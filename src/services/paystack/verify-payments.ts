import PaymentClient from "@/config/axios-payments"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface VerifyPayment {
    message: string
    redirecturl: string
    reference: string
    status: string
    trans: string
    transaction: string
    trxref: string
    billingAccountId: string
}


const verifyPayments = async ({ token, data }: { token: string, data: VerifyPayment }) => {
    const response = await PaymentClient({ token }).post("paystack/verify-multiple", data).then(res => res.data)

    return response
}

const useVerifyStatements = () => {

    const queryClient = useQueryClient()

    const toInvalidate = [
        "invoice",
    ]

    return useMutation({
        mutationFn: verifyPayments,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(item => queryClient.invalidateQueries({
                queryKey: [item]
            })))
        }
    })
}

export default useVerifyStatements