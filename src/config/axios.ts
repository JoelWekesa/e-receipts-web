
import axios from 'axios';
import { getCookie } from 'cookies-next';



const ApiClient = () => {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const defaultOptions = {
		baseURL,
		timeout: 15000,
	};

	const sessionId = getCookie("clerk_session");

	const instance = axios.create(defaultOptions);

	instance.interceptors.request.use(async (request) => {
		if (sessionId) {
			request.headers.Authorization = `Bearer ${sessionId}`;
		}
		return request;
	});

	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(`error`, error);
		}
	);

	return instance;
};

export default ApiClient();
