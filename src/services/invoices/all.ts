import { useQuery } from "@tanstack/react-query";
import getInvoices from "../page/billing/invoices";
import { Invoices } from "@/models/billing/invoices";
interface Props {
    token: string,
    userId: string
    invoices: Invoices[]
}

const useAllInvoices = ({ token, userId, invoices }: Props) => useQuery({
    queryFn: async () => await getInvoices({ token }),
    queryKey: ["invoice", { u: "invoices", userId }],
    placeholderData: invoices
})

export default useAllInvoices