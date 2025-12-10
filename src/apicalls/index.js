import axios from "axios";
export const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
     headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
     }
})