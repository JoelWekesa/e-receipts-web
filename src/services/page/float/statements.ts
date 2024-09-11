import InventoryClient from "@/config/axios-inventory"
import { CashStatement } from "@/models/floats/cash-statements"

interface Props {
    storeId: string
    token: string
}

const getCashStatements = async ({ storeId, token }: Props) => {
    const response: CashStatement[] = await InventoryClient({ token }).get(`floats/cash/statements?storeId=${storeId}`).then(res => res.data)

    return response
}

export default getCashStatements