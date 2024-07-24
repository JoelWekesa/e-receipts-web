import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { allClients } from "../page/clients/all"
import { Client } from "@/models/clients/clients"

interface Props {
    clients: Client[]
}

const useAllClients = ({ clients }: Props) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ""

    return useQuery({
        queryKey: ["clients"],
        queryFn: async () => await allClients({ token }),
        enabled: !!token,
        initialData: clients
    })
}

export default useAllClients