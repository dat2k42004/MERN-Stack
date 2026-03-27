import { axiosInstance } from "./index";


export const GetTicket = async (payload) => {
     try {
          const response = await axiosInstance.get(`/api/tickets/schedule/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.response;
     }
}