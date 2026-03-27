import { axiosInstance } from "."


export const AddPromotion = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/promotions/", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdatePromotion = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/promotions/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeletePromotion = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/promotions/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllPromotions = async () => {
     try {
          const response = await axiosInstance.get("/api/promotions/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


