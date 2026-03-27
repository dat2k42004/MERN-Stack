import { axiosInstance } from "."

export const AddBill = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/bills/", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
};


export const DeleteBill = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/bills/${payload.bill._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
};


export const UpdateBill = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/bills/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}

export const GetBill = async (payload) => {
     try {
          const response = await axiosInstance.get(`/api/bills/user/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllBill = async () => {
     try {
          const response = await axiosInstance.get("/api/bills/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}