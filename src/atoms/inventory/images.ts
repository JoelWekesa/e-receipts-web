import { atom } from "jotai";

interface Image {
    current?: string[]
    new?: File[]
    removed?: string[]
    thumbnail?: File | string
}

const editImagesAtom = atom<Image | null>(null);

export default editImagesAtom