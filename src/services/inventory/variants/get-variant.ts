import InventoryClient from "@/config/axios-inventory"
import { Variant } from "@/models/inventory/inventory"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface Var {
    id: string
    token: string
}

interface VariantProps {
    id: string
    variant: Variant
}

const getVariant = async ({ id, token }: Var) => {
    const variant: Variant = await InventoryClient({
        token
    }).get(`inventory/variant?id=${id}`).then((res) => res.data)


    return variant
}

const useVariant = ({ id, variant }: VariantProps) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['variant', id],
        queryFn: () => getVariant({ id, token }),
        enabled: !!token && !!id,
        initialData: variant
    })
}

export default useVariant