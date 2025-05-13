import { axiosInstance } from "./index";


export const GetTicket = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/tickets/get-ticket", payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}