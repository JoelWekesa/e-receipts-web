import { useQuery } from "@tanstack/react-query"
import getInvoice from "../page/billing/invoice"
import { Invoice } from "@/models/billing/invoice"

interface Params {
    token: string
    id: string,
    invoice: Invoice
}

const useInvoice = ({ token, id, invoice }: Params) => useQuery({
    queryKey: ["invoice", { u: "invoice", id }],
    queryFn: async () => getInvoice({ token, id }),
    placeholderData: invoice
})

export default useInvoice