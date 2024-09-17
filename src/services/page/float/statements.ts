import InventoryClient from "@/config/axios-inventory"
import { CashStatement } from "@/models/floats/cash-statements"

interface Props {
    storeId: string
    token: string
    startDate: string
    endDate: string
}

const getCashStatements = async ({ storeId, token, startDate, endDate }: Props) => {
    const response: CashStatement[] = await InventoryClient({ token }).get(`floats/cash/statements?storeId=${storeId}&startDate=${startDate}&endDate=${endDate}`).then(res => res.data)

    return response
}

export default getCashStatements