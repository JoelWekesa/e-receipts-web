import { useQuery } from "@tanstack/react-query"
import { getPendingInvites } from "../page/teams/pending-invites"
import { useSession } from "next-auth/react"
import { PendingInvite } from "@/models/teams/pending-invites"

const usePendingInvites = ({ invites }: { invites: PendingInvite[] }) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ["pending-invites"],
        queryFn: () => getPendingInvites({ token }),
        enabled: !!token,
        initialData: invites
    })
}

export default usePendingInvites