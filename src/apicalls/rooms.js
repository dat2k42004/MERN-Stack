import { axiosInstance } from "."


export const AddRoom = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/rooms/", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateRoom = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/rooms/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteRoom = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/rooms/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllRooms = async () => {
     try {
          const response = await axiosInstance.get("/api/rooms/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


