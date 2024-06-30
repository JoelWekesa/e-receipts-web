import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import ApiClient from '../../config/axios';
interface Store {
    name: string
    address: string
    phone: string
    email: string
    vat_reg_no?: string | null
    pin_no?: string
    logo: File
}

interface Add {
    data: Store
    token: string
}

const addStore = async ({ data, token }: Add) => {

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    data?.vat_reg_no && formData.append('vat_reg_no', data.vat_reg_no);
    data?.pin_no && formData.append('pin_no', data.pin_no);
    formData.append('logo', data.logo);

    const store = await ApiClient(token).post("stores/new", formData).then(res => res.data)

    return store
}

const useAddStore = (successFn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addStore,
        onSuccess: (data) => {
            toast("Store created successfully", {
                description: dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm:ss"),
            })

            successFn()

            queryClient.invalidateQueries({
                queryKey: ['user-stores']
            })
        },

        onError: (err: any) => {
            console.log("error", err)
        }
    })
}

export default useAddStore;