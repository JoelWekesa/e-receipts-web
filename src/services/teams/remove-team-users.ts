import ApiClient from "@/config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

const removeTeamUser = async ({ token, teamId, userId }: { token: string, teamId: string, userId: string }) => {
    const response = await ApiClient(token).delete(`teams/team-member/remove?id=${teamId}&userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.data);
    return response
}

const useRemoveUser = (successFn: () => void) => {
    const queryClient = useQueryClient();

    const invalidate = [
        queryClient.invalidateQueries({ queryKey: ["team-users"] }),
    ]

    return useMutation({
        mutationFn: removeTeamUser,
        onSuccess: async () => {
            await Promise.all(invalidate)
            successFn()
            toast("User removed from team", {
                description: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
            })
        }
    })
}

export default useRemoveUser