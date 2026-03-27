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

// login with google
export const LoginGoogle = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/users/login-google", payload);
          return response.data;
     }
     catch (error) {
          return error.response.data;
     }
}

// get current user

export const GetCurrentUser = async () => {
     try {
          const response = await axiosInstance.get("/api/users/get-current-user", {
               headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
               }
          });
          return response.data;
     } catch (error) {
          return error.response?.data || { success: false, message: error.message };
     }
};


export const UpdateUser = async (payload) => {
     try {
          const response = await axiosInstance.put(`/api/users/${payload._id}`, payload);
          return response.data;
     } catch (error) {
          return error.response?.data || { success: false, message: error.message };
     }
};

export const DeleteUser = async (payload) => {
     try {
          const response = await axiosInstance.delete(`/api/users/${payload._id}`);
          return response.data;
     } catch (error) {
          return error.message;
     }
};

export const GetAllUsers = async () => {
     try {
          const response = await axiosInstance.get("/api/users/");
          return response.data;
     } catch (error) {
          return error.message;
     }
}

export const ChangePassword = async (payload) => {
     try {
          const response = await axiosInstance.put("/api/users/change-password", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}