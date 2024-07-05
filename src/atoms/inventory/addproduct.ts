import { ProductProps } from "@/services/inventory/products/add";
import { atom } from "jotai";

export type Product = Omit<ProductProps, 'variants' | 'storeId'>

const productAtom = atom<Product | null>(null);

export default productAtom