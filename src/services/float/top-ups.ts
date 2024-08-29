import { useQuery } from "@tanstack/react-query";
import { getFloatTopUps } from "../page/float/top-ups";
import { useSession } from "next-auth/react";
import { FloatTopUp } from "@/models/floats/top-up";

interface Props {
    floatId: string;
    topUps: FloatTopUp[]
}

const useFloatTopUps = ({ floatId, topUps }: Props) => {

    const { data: session } = useSession({
        required: true,
    });


    const token = session?.accessToken || '';

    return useQuery({
        queryKey: ["floatTopUps", { floatId }],
        queryFn: async () => await getFloatTopUps({ floatId, token }),
        initialData: topUps
    })
}

export default useFloatTopUps