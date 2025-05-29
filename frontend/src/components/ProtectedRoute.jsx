import React, { useEffect, useState } from 'react';
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentUser } from '../apicalls/users';
import { SetUser } from '../redux/usersSlice';
import { ShowLoading, HideLoading } from '../redux/loadersSlide';

function ProtectedRoute({ children }) {
     const { user } = useSelector((state) => state.users);
     const navigate = useNavigate();
     const location = useLocation();
     const dispatch = useDispatch();

     const getCurrentUser = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetCurrentUser();
               dispatch(HideLoading());
               if (response.success) {
                    dispatch(SetUser(response.data));
               } else {
                    // Nếu token không hợp lệ hoặc có lỗi từ server, xóa token và chuyển hướng
                    localStorage.removeItem("token"); // <-- THÊM DÒNG NÀY
                    dispatch(SetUser(null));
                    message.error(response.message);
                    navigate("/login");
               }
          } catch (error) {
               dispatch(HideLoading());
               dispatch(SetUser(null));
               message.error(error.message);
               localStorage.removeItem("token"); // <-- THÊM DÒNG NÀY (cho trường hợp lỗi mạng hoặc lỗi không xác định)
               navigate("/login");
          }
     }

     // Không cần fetchedUser state nữa, vì việc xóa token và navigate sẽ giải quyết vòng lặp
     // const [fetchedUser, setFetchedUser] = useState(false);

     useEffect(() => {
          const token = localStorage.getItem("token");
          if (token) {
               // Chỉ gọi getCurrentUser nếu có token VÀ user chưa được tải vào Redux
               if (!user) { // Kiểm tra user trong Redux store
                    getCurrentUser();
               }
          } else {
               // Nếu không có token, chuyển hướng ngay lập tức
               navigate("/login");
          }
     }, [user, navigate]); // Chỉ user và navigate là dependencies

     // Thêm một trạng thái loading cục bộ nếu bạn muốn hiển thị spinner trong khi fetch user
     // Trong trường hợp này, bạn đang dùng Redux loadersSlide, nên không cần
     // Tuy nhiên, có thể hiển thị một cái gì đó rỗng nếu user chưa được tải
     if (!user) {
          return null; // Hoặc một component loading
     }

     // ✅ Quy tắc chặn quyền (giữ nguyên)
     if (user) {
          const path = location.pathname;
          if (user.isAdmin && path.startsWith("/user")) {
               navigate("/notfound");
               return null;
          }
          if (!user.isAdmin && path.startsWith("/admin")) {
               message.error("You do not have permission to access this page!");
               navigate("/notfound");
               return null;
          }
     }

     return user && ( // Chỉ render nếu user đã có
          <div className="layout p-1">
               <div className="header bg-primary flex justify-between p-2">
                    <div>
                         <h1 className="text-2xl text-white cursor-pointer" style={{ fontSize: "30px" }}
                              onClick={() => navigate("/")}>
                              MOVIEBOOKING
                         </h1>
                    </div>

                    <div className="flex flex-row gap-3">
                         <h2 className="text-2xl text-white cursor-pointer" style={{ fontSize: "25px" }}
                              onClick={() => navigate("/")}>
                              🏠Home
                         </h2>

                         <h2 className="text-2xl text-white cursor-pointer" style={{ fontSize: "25px" }}
                              onClick={() => user.isAdmin ? navigate("/admin") : navigate("/user")}>
                              🧩Features
                         </h2>
                    </div>

                    <div className="p-1 flex flex-row gap-1">
                         <h2 className="text-2xl text-white cursor-pointer" style={{ fontSize: "25px" }}
                              onClick={() => navigate("/profile")}>
                              🤖{user.username}
                         </h2>
                         <h2 className="text-2xl text-white cursor-pointer" style={{ fontSize: "25px" }}
                              onClick={() => {
                                   localStorage.removeItem("token");
                                   navigate("/login");
                              }}>
                              ➡️
                         </h2>
                    </div>
               </div>
               <div className="content mt-1 p-1">
                    {React.cloneElement(children, { user })}
               </div>
          </div>
     )
}

export default ProtectedRoute;