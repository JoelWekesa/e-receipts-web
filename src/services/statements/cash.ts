import { CashStatement } from "@/models/floats/cash-statements"
import { useQuery } from "@tanstack/react-query"
import getCashStatements from "../page/float/statements"

interface Props {
    token: string
    storeId: string
    statements: CashStatement[]
}


const useStoreCashStatements = ({ token, storeId, statements }: Props) => {
    return useQuery({
        queryKey: ['cash-statements', { storeId }],
        queryFn: () => getCashStatements({ token, storeId }),
        enabled: !!token && !!storeId,
        initialData: statements
    })

}

export default useStoreCashStatements