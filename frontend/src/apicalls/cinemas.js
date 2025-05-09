import { axiosInstance } from "."


export const AddCinema = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/cinemas/add-cinema", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateCinema = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/cinemas/update-cinema", payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteCinema = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/cinemas/delete-cinema", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllCinemas = async () => {
     try {
          const response = await axiosInstance.get("/api/cinemas/get-all-cinemas");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


