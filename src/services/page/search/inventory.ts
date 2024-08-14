import InventoryClient from "@/config/axios-inventory"
import { SearchInventory } from "@/models/search/inventory"

interface Props {
    name: string
    query: string

}


export const searchInventory = async ({ name, query }: Props) => {
    const response: SearchInventory = await InventoryClient({
        token: ''
    }).get(`search?query=${query}&name=${name}`).then(res => res.data)

    return response
}

