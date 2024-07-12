import { AddReceipt } from "@/models/receipts/add";
import ApiClient from '../../config/axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import dayjs from 'dayjs'
import { PeriodSalesEnum } from "../sales/periodsales";
import { Counts } from "./distribution";
import { TopEnum } from "../top/top";

interface Receipt {
    data: AddReceipt
    token: string
}

const addReceipt = async ({ data, token }: Receipt) => {
    const newReceipt = await ApiClient(token).post("receipts/add", data).then(res => res.data)
    return newReceipt
}


const useAddReceipt = (successFn: () => void) => {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addReceipt,
        onSuccess: async (data) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["business-period"], }),
                queryClient.invalidateQueries({ queryKey: ["totals"], }),
                queryClient.invalidateQueries({ queryKey: ["count"], }),
                queryClient.invalidateQueries({ queryKey: ["top-stores"], }),
                queryClient.invalidateQueries({ queryKey: ["top-customers"], }),
                queryClient.invalidateQueries({ queryKey: ["inventory"], }),
                queryClient.invalidateQueries({ queryKey: [PeriodSalesEnum.dailysales], }),
                queryClient.invalidateQueries({ queryKey: [PeriodSalesEnum.weeklysales], }),
                queryClient.invalidateQueries({ queryKey: [PeriodSalesEnum.monthlysales], }),
                queryClient.invalidateQueries({ queryKey: [PeriodSalesEnum.yearlysales], }),
                queryClient.invalidateQueries({ queryKey: [PeriodSalesEnum.alltime], }),
                queryClient.invalidateQueries({ queryKey: [Counts.daily_count], }),
                queryClient.invalidateQueries({ queryKey: [Counts.weekly_count], }),
                queryClient.invalidateQueries({ queryKey: [Counts.monthly_count], }),
                queryClient.invalidateQueries({ queryKey: [Counts.yearly_count], }),
                queryClient.invalidateQueries({ queryKey: [Counts.alltime_count], }),
                queryClient.invalidateQueries({ queryKey: [TopEnum.topstores], }),
                queryClient.invalidateQueries({ queryKey: [TopEnum.topcustomers], }),
            ])

            successFn()
            toast({
                title: "Receipt successfully sent",
                description: dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm:ss"),
            })
        },
        onError: (err: any) => {
            console.log("error", err)
        }
    })
}

export default useAddReceipt;