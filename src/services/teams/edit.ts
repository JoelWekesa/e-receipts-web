import ApiClient from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Props {
    name: string;
    storeId: string;
    permissionId: string;
    token: string;
    id: string;
}

const editTeam = async ({ token, ...data }: Props) => {
    const response = await ApiClient(token).patch('teams/update', data).then((res) => res.data);
    return response
}

const useEditTeam = (successFn: () => void) => {
    const queryClient = useQueryClient()

    const invalidate = [
        queryClient.invalidateQueries({ queryKey: ["teams"] }),
    ]

    return useMutation({
        mutationFn: editTeam,
        onSuccess: async () => {
            await Promise.all(invalidate)
            toast("Team updated successfully", {
                description: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
            })

            successFn()
        }
    })
}

export default useEditTeam