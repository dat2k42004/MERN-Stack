import { axiosInstance } from "."


export const AddCinema = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/cinemas/", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateCinema = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/cinemas/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteCinema = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/cinemas/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllCinemas = async () => {
     try {
          const response = await axiosInstance.get("/api/cinemas/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


