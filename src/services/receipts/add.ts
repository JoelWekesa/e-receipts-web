import { AddReceipt } from "@/models/receipts/add";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from 'dayjs';
import { toast } from "sonner";
import ApiClient from '../../config/axios';
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
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addReceipt,
        onSuccess: async (data) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["business-period"], }),
                queryClient.invalidateQueries({ queryKey: ["totals"], }),
                queryClient.invalidateQueries({ queryKey: ["count"], }),
                queryClient.invalidateQueries({ queryKey: ["top"], }),
                queryClient.invalidateQueries({ queryKey: ["inventory"], }),
                queryClient.invalidateQueries({ queryKey: ["receipts"], }),
                queryClient.invalidateQueries({ queryKey: ["distribution"], }),
                queryClient.invalidateQueries({ queryKey: [TopEnum.topstores], }),
                queryClient.invalidateQueries({ queryKey: [TopEnum.topcustomers], }),
            ])

            successFn()
            toast("Receipt successfully sent", {
                description: dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: 'top-right'
            })
        },
        onError: (err: any) => {
            console.log("error", err)
        }
    })
}

export default useAddReceipt;