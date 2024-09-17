import { CashStatement } from "@/models/floats/cash-statements"
import { useQuery } from "@tanstack/react-query"
import getCashStatements from "../page/float/statements"

interface Props {
    token: string
    storeId: string
    statements: CashStatement[]
    startDate: string
    endDate: string
}


const useStoreCashStatements = ({ token, storeId, startDate, endDate, statements }: Props) => {
    return useQuery({
        queryKey: ['cash-statements', { storeId, startDate, endDate }],
        queryFn: () => getCashStatements({ token, storeId, startDate, endDate }),
        enabled: !!token && !!storeId,
        placeholderData: statements
    })

}

export default useStoreCashStatements