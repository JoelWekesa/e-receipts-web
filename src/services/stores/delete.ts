import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import ApiClient from '../../config/axios';


const deleteStore = async (id: string) => {
    const store = await ApiClient.delete("stores/delete", {
        data: { id }
    }).then(res => res.data)
    return store
}

const useDeleteStore = (successFn: () => void) => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteStore,
        onSuccess: () => {
            toast("Store deleted successfully", {
                description: dayjs(new Date()).format("DD/MMMM/YYYY HH:mm:ss"),
            })

            queryClient.invalidateQueries({
                queryKey: ['user-stores']
            })

            successFn()
        },
        onError: (err: any) => {
            console.log("error", err)
        }
    })
}

export default useDeleteStore