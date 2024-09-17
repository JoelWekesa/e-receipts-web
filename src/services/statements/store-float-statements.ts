import { useQuery } from "@tanstack/react-query"
import getStoreFloatStatements from "../page/float/float-statements";
import { FloatStatement } from "@/models/floats/float-statements";

interface Props {
    storeId: string;
    token: string;
    statements: FloatStatement[];
    startDate: string
    endDate: string
}

const useStoreFloatStatements = ({ storeId, token, statements, startDate, endDate }: Props) => {

    return useQuery({
        queryKey: ['float-statements', { storeId, startDate, endDate }],
        queryFn: () => getStoreFloatStatements({ storeId, token, startDate, endDate }),
        placeholderData: statements,
    })
}

export default useStoreFloatStatements;