import ApiClient from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Reset {
    password: string
    confirm: string
    token: string
}

const resetPassword = async ({ token, ...data }: Reset) => {
    const response = await ApiClient(token).post('auth/reset-password-from-profile', data).then((res) => res.data);

    return response
}

const useResetPasswordProfile = (successFn: () => void) => {
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast("Password set successfully", {
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })

            successFn()

        }
    })
}

export default useResetPasswordProfile