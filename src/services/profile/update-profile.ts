import ApiClient from "@/config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Profile {
    phone?: string
    dp?: File
    address?: string
}

const updateProfile = async ({ data, token }: { data: Profile, token: string }) => {

    const formData = new FormData()
    data?.phone && formData.append("phone", data.phone)
    data?.dp && data?.dp !== undefined && formData.append("dp", data.dp)
    data?.address && formData.append("address", data.address)

    const result = await ApiClient(token).patch('profile/update', formData).then(res => res.data)

    return result

}


const useUpdateProfile = ({ successFn }: { successFn: () => void }) => {

    const queryClient = useQueryClient()

    const toInvalidate = ['profile']

    const invalidate = toInvalidate.map(item => queryClient.invalidateQueries({
        queryKey: [item]
    }))

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: async () => {
            await Promise.all(invalidate)

            successFn()
        }
    })
}

export default useUpdateProfile