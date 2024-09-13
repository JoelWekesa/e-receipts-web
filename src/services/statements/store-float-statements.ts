import { useQuery } from "@tanstack/react-query"
import getStoreFloatStatements from "../page/float/float-statements";
import { FloatStatement } from "@/models/floats/float-statements";

interface Props {
    storeId: string;
    token: string;
    statements: FloatStatement[];
}

const useStoreFloatStatements = ({ storeId, token, statements }: Props) => {

    return useQuery({
        queryKey: ['float-statements', storeId],
        queryFn: () => getStoreFloatStatements({ storeId, token }),
        initialData: statements,
    })
}

export default useStoreFloatStatements;