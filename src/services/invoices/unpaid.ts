import { UnpaidInvoices } from "@/models/billing/unpaid";
import { useQuery } from "@tanstack/react-query";
import unpaidInvoices from "../page/billing/unpaid";
interface Props {
    token: string,
    billingAccountId: string
    unpaid: UnpaidInvoices
}

const useAUnpaidInvoices = ({ token, billingAccountId, unpaid }: Props) => useQuery({
    queryFn: async () => await unpaidInvoices({ token, billingAccountId }),
    queryKey: ["invoice", { u: "unpaid", billingAccountId }],
    placeholderData: unpaid
})

export default useAUnpaidInvoices