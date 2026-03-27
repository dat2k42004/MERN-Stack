import { axiosInstance } from "."


export const AddMovie = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/movies/", payload, {
               headers: {
                    'Content-Type': 'multipart/form-data'
               }
          });
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateMovie = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/movies/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteMovie = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/movies/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllMovies = async () => {
     try {
          const response = await axiosInstance.get("/api/movies/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


