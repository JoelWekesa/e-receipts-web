import ApiClient from "@/config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { toast } from "sonner"

interface Props {
    token: string
    id: string
}

const deleteInvite = async ({ token, id }: Props) => {
    const response = await ApiClient(token).delete(`teams/invite/delete?id=${id}`).then(res => res.data)

    return response
}

const useDeleteInvite = (successFn: () => void) => {
    const queryClient = useQueryClient();

    const invalidate = [
        queryClient.invalidateQueries({ queryKey: ["pending-invites"] }),
    ]

    return useMutation({
        mutationFn: deleteInvite,
        onSuccess: async () => {
            await Promise.all(invalidate)
            successFn()
            toast("Invite successfully cancelled", {
                description: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })
        }
    })
}

export default useDeleteInvite