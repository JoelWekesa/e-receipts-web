import InventoryClient from "@/config/axios-inventory"
import { Total } from "@/models/inventory/total"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

const invValue = async ({ token, url }: { token: string, url: string }) => {

    const response = await InventoryClient({
        token
    }).get(url).then(res => res.data)

    return response

}

const useInvValue = ({ url, initialData }: { url: string, initialData: Total }) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''


    return useQuery({
        queryKey: ['inventory', { url }],
        queryFn: () => invValue({ token, url }),
        initialData,
        enabled: !!token
    })

}

export default useInvValue