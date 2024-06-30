
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

    return useQuery({

        queryKey: ['setting', setting?.id],
        queryFn: () => getSetting(session?.accessToken || ''),
        initialData: setting,
    })
}

export default useSetting;