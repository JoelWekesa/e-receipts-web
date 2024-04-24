
import { Setting } from '@/models/setting';
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';

const getSetting = async () => {
    const setting: Setting = await ApiClient.get("settings").then(res => res.data)

    return setting
}


const useSetting = (setting?: Setting) => useQuery({
    queryKey: ['setting', setting?.id],
    queryFn: getSetting,
    initialData: setting,
})

export default useSetting;