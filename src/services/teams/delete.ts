import ApiClient from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Props {
    teamId: string;
    token: string;
}

const deleteTeam = async ({ token, teamId }: Props) => {
    const response = await ApiClient(token).delete(`teams?id=${teamId}`).then((res) => res.data);
    return response
}

const useDeleteTeam = (successFn: () => void) => {
    const queryClient = useQueryClient()

    const invalidate = [
        queryClient.invalidateQueries({ queryKey: ["teams"] }),
    ]

    return useMutation({
        mutationFn: deleteTeam,
        onSuccess: async () => {
            await Promise.all(invalidate)
            toast("Team deleted successfully", {
                description: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
                position: "top-right"
            })

            successFn()
        }
    })
}

export default useDeleteTeam