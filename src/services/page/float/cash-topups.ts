import InventoryClient from "@/config/axios-inventory"
import { CashTopUp } from "@/models/floats/cash-topups"

interface Props {
    token: string
    floatId: string
}

const getCashTopUps = async ({ token, floatId }: Props) => {
    const response: CashTopUp[] = await InventoryClient({ token }).get(`floats/cash/top-ups?floatId=${floatId}`).then(res => res.data)

    return response
}

export default getCashTopUps