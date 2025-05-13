import { axiosInstance } from "."


export const AddPromotion = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/promotions/add-promotion", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdatePromotion = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/promotions/update-promotion", payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeletePromotion = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/promotions/delete-promotion", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllPromotions = async () => {
     try {
          const response = await axiosInstance.get("/api/promotions/get-all-promotions");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


