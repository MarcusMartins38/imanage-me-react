import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// api.interceptors.request.use(
//     (config) => {
//         const [cookie, _] = useCookies(['userAuth'])
//     }
// )
