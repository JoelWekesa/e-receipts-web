import ApiClient from "@/config/axios"
import { Profile } from "@/models/profile/user-profile"

export const profileView = async ({ token }: { token: string }) => {
    const profile: Profile = await ApiClient(token).get("profile").then(res => res.data)

    return profile
}
