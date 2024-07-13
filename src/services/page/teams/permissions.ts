import ApiClient from "@/config/axios"
import { Permission } from "@/models/teams/permissions"

export const getPermissions = async ({ token }: { token: string }) => {
    const response: Permission[] = await ApiClient(token).get('teams/permissions').then(res => res.data)

    return response
}