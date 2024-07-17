import { TeamUser } from "@/models/teams/team-users";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { teamUsers } from "../page/teams/team-users";


const useTeamUsers = ({ id, team_user }: { id: string, team_user: TeamUser }) => {

    const { data: session } = useSession({
        required: true,
    })

    const token = session?.accessToken || ''

    return useQuery({
        queryKey: ['team-users', { id }],
        queryFn: () => teamUsers({ token, id }),
        enabled: !!token,
        initialData: team_user
    })
}

export default useTeamUsers