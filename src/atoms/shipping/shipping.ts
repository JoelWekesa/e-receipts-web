import { Shipping } from "@/models/shipping/shipping";
import { atom } from "jotai";

const shippingAtom = atom<Shipping | null>(null)

export default shippingAtom