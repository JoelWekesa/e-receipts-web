
import { Setting } from '@/models/setting';
import { useQuery } from "@tanstack/react-query";
import ApiClient from '../../config/axios';
import { useSession } from 'next-auth/react';

const getSetting = async (token: string) => {
    const setting: Setting = await ApiClient(token).get("settings").then(res => res.data)

    return setting
}


const useSetting = (setting?: Setting) => {

    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken

    return useQuery({

        queryKey: ['setting', setting?.id],
        queryFn: () => getSetting(token || ''),
        initialData: setting,
        enabled: !!token
    })
}

export default useSetting;