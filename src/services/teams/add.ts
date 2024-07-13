import ApiClient from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "sonner";

interface Props {
    name: string;
    storeId: string;
    permissionId: string;
    token: string;
}

const addTeam = async ({ token, ...data }: Props) => {
    const response = await ApiClient(token).post('teams/new', data).then((res) => res.data);
    return response
}

const useAddTeam = (successFn: () => void) => {
    const queryClient = useQueryClient()

    const invalidate = [
        queryClient.invalidateQueries({ queryKey: ["teams"] }),
    ]

    return useMutation({
        mutationFn: addTeam,
        onSuccess: async () => {
            await Promise.all(invalidate)
            toast("Team created successfully", {
                description: dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss"),
            })

            successFn()
        }
    })
}

export default useAddTeam