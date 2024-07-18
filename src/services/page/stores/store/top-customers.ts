import ApiClient from "@/config/axios"

interface Props {
    storeId: string
    token: string

}
export const getStoreTopCustomers = async ({ storeId, token }: Props) => {
    const response = await ApiClient(token).get(`receipts/store/topcustomersvolume?storeId=${storeId}`).then(res => res.data)
    return response
}