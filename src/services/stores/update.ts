import { Store } from '@/models/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import ApiClient from '../../config/axios';
interface StoreUpdate {
    id: string
    name: string
    address: string
    phone: string
    email: string
    vat_reg_no?: string | null
    pin_no?: string
    logo?: File
}

interface Update {
    data: StoreUpdate,
    token: string
}

const updateStore = async ({ data, token }: Update) => {

    const formData = new FormData();
    formData.append('id', data.id);
    data?.name && formData.append('name', data.name);
    data?.address && formData.append('address', data.address);
    data?.phone && formData.append('phone', data.phone);
    data?.email && formData.append('email', data.email);
    data?.vat_reg_no && formData.append('vat_reg_no', data.vat_reg_no);
    data?.pin_no && formData.append('pin_no', data.pin_no);
    data?.logo && formData.append('logo', data.logo);

    const store: Store = await ApiClient(token).patch("stores/update", formData).then(res => res.data)

    return store
}

const useUpdateStore = (successFn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateStore,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({
                queryKey: ['user-stores']
            })
            toast("Store updates successfully", {
                description: dayjs(data?.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })

            successFn()
        },

        onError: (err: any) => {
            console.log("error", err)
        }
    })
}

export default useUpdateStore;