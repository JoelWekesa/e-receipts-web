import { atom } from "jotai";

const addImagesAtom = atom<File[]>([]);

export const thumbnailAtom = atom<File | null>(null);

export default addImagesAtom