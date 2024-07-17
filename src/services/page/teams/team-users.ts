import ApiClient from "@/config/axios";
import { TeamUser } from "@/models/teams/team-users";

export const teamUsers = async ({ token, id }: { token: string, id: string }) => {

    const response: TeamUser = await ApiClient(token)
        .get(`teams/team-members?id=${id}`)
        .then((res) => res.data);

    return response
}