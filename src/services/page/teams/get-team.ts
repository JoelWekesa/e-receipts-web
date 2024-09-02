import ApiClient from "@/config/axios"
import { Team } from "@/models/teams/team"

interface Props {
    id: string
    token: string
}

export const getTeam = async ({ token, id }: Props) => {
    const response: Team = await ApiClient(token).get(`/teams/team?id=${id}`).then(res => res.data)

    return response
}