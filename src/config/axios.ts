
import axios from 'axios';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import Swal from 'sweetalert2';



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
			toast("An Error Occurred", {
				description: error?.response?.data?.message || "Something went wrong!",
			})
		}
	);

	return instance;
};

export default ApiClient();
