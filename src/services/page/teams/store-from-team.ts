import ApiClient from "@/config/axios"
import { StoreFromTeam } from "@/models/teams/store-from-team"
interface Props {
    id: string,
    token: string
}

export const getStoreFromTeam = async ({ id, token }: Props) => {
    const response: StoreFromTeam = await ApiClient(token).get(`teams/store-from-team?id=${id}`).then(res => res.data)

    return response
}