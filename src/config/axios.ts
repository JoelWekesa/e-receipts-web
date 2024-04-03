
import axios from 'axios';
import { getCookie } from 'cookies-next';
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
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: error?.response?.data?.message || "Something went wrong!",
				footer: '<a href="#">Why do I have this issue?</a>'
			})
		}
	);

	return instance;
};

export default ApiClient();
