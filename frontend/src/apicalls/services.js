import { axiosInstance } from "."


export const AddService = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/services/add-service", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateService = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/services/update-service", payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteService = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/services/delete-service", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllServices = async () => {
     try {
          const response = await axiosInstance.get("/api/services/get-all-services");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


