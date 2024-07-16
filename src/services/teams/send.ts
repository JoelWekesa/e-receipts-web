import ApiClient from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Props {
    teamId: string;
    email: string;
    token: string;
}

const sendInvite = async ({ token, ...data }: Props) => {
    const response = await ApiClient(token).post('teams/invite', data).then((res) => res.data);
    return response;
}

const useSendInvite = (successFn: () => void) => {
    const queryClient = useQueryClient();

    const invalidate = [
        queryClient.invalidateQueries({ queryKey: ["teams"] }),
    ]

    return useMutation({
        mutationFn: sendInvite,
        onSuccess: async () => {
            await Promise.all(invalidate)
            successFn()
            toast("Invite sent", {
                description: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss"),
                icon: "✅",
            })
        }
    })

}

export default useSendInvite;