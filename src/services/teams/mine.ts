import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { getMineTeams } from "../page/teams/mine"
import { MyTeam } from "@/models/teams/my-teams"

const useMyTeams = (data: MyTeam[]) => {
    const { data: session } = useSession({
        required: true
    })



    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ["teams"],
        queryFn: () => getMineTeams({ token }),
        initialData: data,
        enabled: token.length > 0
    })
}

export default useMyTeams