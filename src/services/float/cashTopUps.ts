import { CashTopUp } from "@/models/floats/cash-topups"
import { useQuery } from "@tanstack/react-query"
import getCashTopUps from "../page/float/cash-topups"

interface Props {
    floatId: string
    cashTopUps: CashTopUp[]
    token: string
}

const useCashTopUps = ({ floatId, token }: Props) => {

    return useQuery({
        queryKey: ['cashTopUps', { floatId }],
        queryFn: () => getCashTopUps({ token, floatId }),
        enabled: !!floatId && !!token
    })
}

export default useCashTopUps