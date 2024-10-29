import ApiClient from "@/config/axios"

export const profileView = async ({ token }: { token: string }) => {
    const profile = await ApiClient(token).get("profile").then(res => res.data)

    return profile
}
