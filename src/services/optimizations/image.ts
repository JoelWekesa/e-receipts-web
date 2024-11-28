import getImage from "@/lib/image";
import { useQuery } from "@tanstack/react-query";

const useOptimizedImage = ({ src }: { src: string }) => useQuery({
    queryKey: ["image-optimized", { src }],

    queryFn: async () => await getImage({ src })
})

export default useOptimizedImage