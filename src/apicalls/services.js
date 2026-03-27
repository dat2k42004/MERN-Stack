import { axiosInstance } from "."


export const AddService = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/services/", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateService = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/services/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteService = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/services/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllServices = async () => {
     try {
          const response = await axiosInstance.get("/api/services/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


