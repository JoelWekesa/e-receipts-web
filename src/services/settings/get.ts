
import { Setting } from '@/models/setting';
import { useQuery } from "@tanstack/react-query";
import { useSession } from 'next-auth/react';
import { getSetting } from '../page/settings/get-setting';


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