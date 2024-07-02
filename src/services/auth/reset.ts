import ApiClient from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Reset {
    code: string
    password: string
    confirm: string
}

const resetPassword = async (data: Reset) => {
    const response = await ApiClient('').post('auth/reset-password', data).then((res) => res.data);

    return response
}

const useResetPassword = (successFn: () => void) => {
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast("Password reset successfully", {
                icon: "📧",
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
            })
            successFn()
        }
    })
}

export default useResetPassword