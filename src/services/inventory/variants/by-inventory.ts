import InventoryClient from "@/config/axios-inventory"
import { Variant } from "@/models/inventory/inventory"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface Var {
    id: string
    variants: Variant[]
}

const inventoryVariants = async ({ id, token }: { id: string, token: string }) => {
    const variants = await InventoryClient({
        token
    }).get(`inventory/variants?inventoryId=${id}`).then((res) => res.data)

    return variants
}

const useInventoryVariants = ({ id, variants }: Var) => {
    const { data: session } = useSession({ required: true })
    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['inventory-variants', { id }],
        queryFn: () => inventoryVariants({ id, token }),
        enabled: !!token && !!id,
        initialData: variants
    })

}

export default useInventoryVariants