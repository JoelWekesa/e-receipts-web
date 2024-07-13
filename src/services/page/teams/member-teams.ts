import ApiClient from "@/config/axios";
import { MemberTeam } from "@/models/teams/member-team";

export const getTeams = async ({ token }: { token: string }) => {
    const response: MemberTeam[] = await ApiClient(token)
        .get('teams/my-teams')
        .then((res) => res.data);
    return response;
};