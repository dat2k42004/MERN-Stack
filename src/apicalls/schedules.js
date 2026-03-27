import { axiosInstance } from "."


export const AddSchedule = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/schedules/", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateSchedule = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/schedules/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteSchedule = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/schedules/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllSchedules = async () => {
     try {
          const response = await axiosInstance.get("/api/schedules/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


