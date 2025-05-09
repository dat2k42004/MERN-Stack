import { axiosInstance } from "."


export const AddRoom = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/rooms/add-room", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateRoom = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/rooms/update-room", payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteRoom = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/rooms/delete-room", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllRooms = async () => {
     try {
          const response = await axiosInstance.get("/api/rooms/get-all-rooms");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


