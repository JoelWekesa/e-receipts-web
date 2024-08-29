import InventoryClient from "@/config/axios-inventory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    storeId: string;
    token: string
}

const optIn = async ({ storeId, token }: Props) => {
    const response = await InventoryClient({ token }).post(`floats/opt-in`, { storeId }).then(res => res.data);
    return response
}

const useOptIn = () => {
    const queryClient = useQueryClient()

    const toInvalidate = [
        'storeFloat',
    ]

    return useMutation({
        mutationFn: optIn,
        onSuccess: async () => {
            await Promise.all(toInvalidate.map(key => queryClient.invalidateQueries(
                {
                    queryKey: [key]
                }
            )))
        }
    })
}

export default useOptIn