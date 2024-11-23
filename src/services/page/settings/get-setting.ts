import ApiClient from "@/config/axios"
import { Setting } from "@/models/setting"

export const getSetting = async (token: string) => {
    const setting: Setting | null = await ApiClient(token).get("settings").then(res => res.data)

    console.log(setting)

    return setting
}