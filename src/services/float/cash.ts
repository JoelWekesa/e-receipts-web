import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getStoreCash } from "../page/float/cash"
import { StoreCash } from "@/models/floats/store"

interface Props {
    storeId: string
    storeCash: StoreCash | null
}

const useStoreCash = ({ storeId, storeCash }: Props) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ["storeCash", { storeId }],
        queryFn: async () => await getStoreCash({ storeId, token }),
        initialData: storeCash
    })

}

export default useStoreCash