import { axiosInstance } from "."

export const AddBill = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/bills/add-bill", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
};


export const DeleteBill = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/bills/delete-bill", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
};

export const UpdateBill = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/bills/update-bill", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}

export const GetBill = async (payload) => {
     try {
          const response = await axiosInstance.post("/api/bills/get-bill", payload);
          return response.data;
     } catch (error) {
          return error.message;
     }
}


export const GetAllBill = async () => {
     try {
          const response = await axiosInstance.get("/api/bills/get-all-bill");
          return response.data;
     } catch (error) {
          return error.message;
     }
}