import { Client } from "@/models/clients/clients"
import { useQuery } from "@tanstack/react-query"
import { getStoreClients } from "../page/clients/store"
import { useSession } from "next-auth/react"

interface Props {
    storeId: string
    clients: Client[]
}

const useStoreClients = ({ storeId, clients }: Props) => {

    const { data: session } = useSession({
        required: true

    })

    const token = session?.accessToken || ""

    return useQuery({
        queryKey: ["clients", { storeId }],
        queryFn: async () => await getStoreClients({ storeId, token }),
        enabled: !!storeId && !!token,
        initialData: clients
    })
}

export default useStoreClients