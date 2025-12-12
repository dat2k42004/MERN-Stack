import axios from "axios";
console.log(import.meta.env.VITE_BACKEND_URL);
export const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_BACKEND_URL,
     headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
     }
})

