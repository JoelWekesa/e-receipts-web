import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import getShipping from "../page/shipping/get"
import { Shipping } from "@/models/shipping/shipping"

interface Props {
    shipping: Shipping
}

const useShipping = ({ shipping }: Props) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['shipping'],
        queryFn: async () => await getShipping({ token }),
        initialData: shipping
    })
}

export default useShipping