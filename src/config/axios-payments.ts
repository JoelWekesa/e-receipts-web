
import axios from 'axios';

const PaymentClient = ({ token }: { token: string }) => {
    const baseURL = process.env.NEXT_PUBLIC_PAYMENTS_URL;
    const defaultOptions = {
        baseURL,
        timeout: 1500000,
    };

    const instance = axios.create(defaultOptions);

    instance.interceptors.request.use(async (request) => {
        // const sessionId = await getServerSession(options);

        request.headers.Authorization = `Bearer ${token}`;

        return request;
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {

            console.log(error)

        }
    );

    return instance;
};

export default PaymentClient;
