import ApiClient from "@/config/axios"
import { Profile } from "@/models/profile/user-profile"

export const profileView = async ({ token }: { token: string }) => {


    if (token.length === 0) {
        return null
    }

    const profile: Profile = await ApiClient(token).get("profile").then(res => res.data)

    return profile
}
