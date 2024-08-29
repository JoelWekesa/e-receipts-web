import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import dayjs from "dayjs";

interface Props {
    floatId: string;
    token: string;
    transactionId: string;
    amount: number;
}

const floatTopUp = async ({ token, ...data }: Props) => {
    const response = await InventoryClient({ token }).post('floats/top-up', data).then(res => res.data);
    return response
}

const useFloatTopUp = (successFn: () => void) => {
    const queryClient = useQueryClient()

    const toInvalidate = [
        'storeFloat',
        'floatTopUps'
    ]


    return useMutation({
        mutationFn: floatTopUp,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries(
                {
                    queryKey: [key]
                }
            )))
            toast("Float Added", {
                icon: "✅",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                position: 'top-right'
            })

            successFn()
        }
    })
}

export default useFloatTopUp