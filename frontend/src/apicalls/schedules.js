import { axiosInstance } from "."


export const AddSchedule = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/schedules/add-schedule", payload);
          return response.data;
     }
     catch (error) {
          return error.response;
     }
}

export const UpdateSchedule = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/schedules/update-schedule", payload);
          return response.data;
     } catch (error) {
          return error.response;
     }
}

export const DeleteSchedule = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/schedules/delete-schedule", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllSchedules = async () => {
     try {
          const response = await axiosInstance.get("/api/schedules/get-all-schedules");
          return response.data;
     } catch (error) {
          return error.message;
     }
}


