import ApiClient from "@/config/axios"
import { PendingInvite } from "@/models/teams/pending-invites";

export const getPendingInvites = async ({ token }: { token: string }) => {
    const response: PendingInvite[] = await ApiClient(token).get('teams/invite/pending').then((res) => res.data);
    return response
}