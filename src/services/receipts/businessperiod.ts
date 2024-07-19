import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../config/axios';
import { Receipt } from '@/models/receipts/receipt';
import { useSession } from 'next-auth/react';

export enum Period {

    day = 'day',
    week = 'week',
    month = 'month',
    year = 'year',
    alltime = 'alltime'
}


interface BusinessPeriod {
    period: Period;
    receipts: Receipt[]
}
const getBusinessPeriod = async ({ period, token }: { period: Period, token: string }) => {

    const receipts: Receipt[] = await ApiClient(token).get("receipts/stores?period=" + period).then(res => res.data)

    return receipts

}


const useBusinessPeriod = ({ period, receipts }: BusinessPeriod) => {
    const { data: session } = useSession({
        required: true
    })

    const token = session?.accessToken


    return useQuery({
        queryKey: ['receipts', { period, id: 'business-period' }],
        queryFn: () => getBusinessPeriod({
            period,
            token: token || '',

        }),
        initialData: receipts,
        enabled: !!token
    })
}

export default useBusinessPeriod;