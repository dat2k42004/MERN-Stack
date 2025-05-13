import { axiosInstance } from "."

export const AddBill = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/bills/add-bill", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}

export const GetBill = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/bills/get-bill", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}