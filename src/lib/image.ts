import { getPlaiceholder } from "plaiceholder";

const getImage = async ({ src }: { src: string }) => {
    const buffer = await fetch(src).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
    );

    const {
        metadata: { height, width },
        ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
        ...plaiceholder,
        img: { src, height, width },
    };
};

export default getImage