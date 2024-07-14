import ApiClient from "@/config/axios"
import { MyTeam } from "@/models/teams/my-teams"

export const getMineTeams = async ({ token }: { token: string }) => {
    const response: MyTeam[] = await ApiClient(token).get('teams/mine').then(res => res.data)

    return response
}