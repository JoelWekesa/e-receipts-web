import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../config/axios';
import { Receipt } from '@/models/receipts/receipt';

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
const getBusinessPeriod = async (period: Period) => {

    const receipts: Receipt[] = await ApiClient.get("receipts/store?period=" + period).then(res => res.data)

    return receipts

}


const useBusinessPeriod = ({ period, receipts }: BusinessPeriod) => {
    return useQuery({
        queryKey: ['business-period', period],
        queryFn: () => getBusinessPeriod(period),
        initialData: receipts,
    })
}

export default useBusinessPeriod;