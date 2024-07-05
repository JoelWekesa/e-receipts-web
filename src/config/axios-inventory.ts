
import axios from 'axios';
import { toast } from 'sonner';

interface Options {
    token: string;
    id?: string
}

const InventoryClient = ({ token, id }: Options) => {
    const baseURL = process.env.NEXT_PUBLIC_INVENTORY_URL;
    const defaultOptions = {
        baseURL,
        timeout: 15000,
    };

    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use(async (request) => {
        // const sessionId = await getServerSession(options);

        request.headers.Authorization = `Bearer ${token}`;
        request.headers.id = id;

        return request;
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            toast("An Error Occurred", {
                description: error?.response?.data?.message || "Something went wrong!",
            })
        }
    );

    return instance;
};

export default InventoryClient;
