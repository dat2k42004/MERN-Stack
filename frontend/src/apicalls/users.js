import { axiosInstance } from "./index";


//Register new user
export const RegisterUser = async (payLoad) => {
     try {
          const response = await axiosInstance.post("/api/users/register", payLoad);
          return response.data;
     }
     catch (error) {
          return error.response.data;
     }
}


//login a user

export const LoginUser = async (payLoad) => {
     try {
          const response = await axiosInstance.post("/api/users/login", payLoad);
          return response.data;
     }
     catch (error) {
          return error.response.data;
     }
}

// get current user 

export const GetCurrentUser = async () => {
     try {
          const response = await axiosInstance.get("/api/users/get-current-user");
          return response.data;
     }
     catch (error) {
          return error;
     }
}

export const UpdateUser = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/users/update-user", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
};

export const DeleteUser = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/users/delete-user", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
};

export const GetAllUsers = async () => {
     try {
          const response = await axiosInstance.get("/api/users/get-all-users");
          return response.data;
     } catch (error) {
          return error.message;
     }
}

export const ChangePassword = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/users/change-password", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}