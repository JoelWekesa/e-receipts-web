
import axios from 'axios';
import { toast } from 'sonner';

const ApiClient = (token: string) => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const defaultOptions = {
		baseURL,
		timeout: 15000,
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


			toast("An Error Occurred", {
				description: error?.response?.data?.message || "Something went wrong!",
				icon: "❌",
			})
		}
	);

	return instance;
};

export default ApiClient;
