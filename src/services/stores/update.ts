import { useMutation, useQueryClient } from '@tanstack/react-query';
import ApiClient from '../../config/axios';
import Swal from 'sweetalert2'
import { toast } from 'sonner';
import dayjs from 'dayjs'
import { StoreDatum } from '@/models/store';
interface Store {
    id: string
    name: string
    address: string
    phone: string
    email: string
    vat_reg_no?: string | null
    pin_no?: string
    logo?: File
}

const updateStore = async (data: Store) => {

    const formData = new FormData();
    formData.append('id', data.id);
    data?.name && formData.append('name', data.name);
    data?.address && formData.append('address', data.address);
    data?.phone && formData.append('phone', data.phone);
    data?.email && formData.append('email', data.email);
    data?.vat_reg_no && formData.append('vat_reg_no', data.vat_reg_no);
    data?.pin_no && formData.append('pin_no', data.pin_no);
    data?.logo && formData.append('logo', data.logo);

    const store: StoreDatum = await ApiClient.patch("stores/update", formData).then(res => res.data)

    return store
}

const useUpdateStore = (successFn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateStore,
        onSuccess: (data) => {
            toast("Store updates successfully", {
                description: dayjs(data?.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
            })

            successFn()

            queryClient.invalidateQueries({
                queryKey: ['user-stores']
            })
        },

        onError: (err: any) => {
            console.log("error", err)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                // footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    })
}

export default useUpdateStore;