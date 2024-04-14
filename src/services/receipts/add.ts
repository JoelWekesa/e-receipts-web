import { AddReceipt } from "@/models/receipts/add";
import ApiClient from '../../config/axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import dayjs from 'dayjs'

const addReceipt = async (data: AddReceipt) => {
    const newReceipt = await ApiClient.post("receipts/add", data).then(res => res.data)
    return newReceipt
}


const useAddReceipt = (successFn: () => void) => {
    const { toast } = useToast()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addReceipt,
        onSuccess: async (data) => {
            await Promise.all([queryClient.invalidateQueries({ queryKey: ["business-period"], }), queryClient.invalidateQueries({ queryKey: ["totals"], })])

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