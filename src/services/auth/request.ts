import ApiClient from "@/config/axios"
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Identity {
    identity: string
}

const requestReset = async (data: Identity) => {
    const response = await ApiClient('').post('auth/reset-code', data).then((res) => res.data);
    return response
}

const useRequestReset = (successFn: () => void) => {
    return useMutation({
        mutationFn: requestReset,
        onSuccess: () => {
            toast("Reset code sent successfully", {
                description: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })
            successFn()
        }
    })
}

export default useRequestReset