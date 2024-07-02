import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import ApiClient from '../../config/axios';
import MultiPartClient from '@/config/axios-multipart';


interface Auth {
    username: string
    phone: string
    email?: string
    password: string
    f_name: string
    l_name: string
    image?: File
    confirm: string
}

const register = async (data: Auth) => {


    const formData = new FormData();
    formData.append("username", data.username)
    formData.append("phone", data.phone)
    formData.append("password", data.password)
    formData.append("f_name", data.f_name)
    formData.append("l_name", data.l_name)
    data?.email && formData.append("email", data.email)
    data?.image && formData.append("image", data.image)

    console.log(formData.getAll('image'))


    const user = await ApiClient('').post("auth/register", formData).then(res => res.data)

    return user
}



const useRegisterUser = (successFn: () => void) => {
    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            toast("Registered successfully", {
                description: dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm:ss"),
            })
            successFn()
        },
    })
}

export default useRegisterUser