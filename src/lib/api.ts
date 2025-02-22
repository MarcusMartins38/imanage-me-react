import axios from "axios";

//VITE_API_BASE_URL="http://localhost:3333/api"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use(
//     (config) => {
//         const [cookie, _] = useCookies(['userAuth'])
//     }
// )
