import { Inventory } from "@/models/inventory/inventory";
import { atom } from "jotai";

interface ModeInventory {
    inventory: Inventory | null
    path: string
}

const inventoryAtom = atom<ModeInventory | null>({
    inventory: null,
    path: 'inventory'
})

export default inventoryAtom