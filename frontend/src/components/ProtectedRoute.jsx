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
                    dispatch(SetUser(null));
                    message.error(response.message);
                    navigate("/login");
               }
          } catch (error) {
               dispatch(HideLoading());
               dispatch(SetUser(null));
               message.error(error.message);
               navigate("/login");
          }
     }

     useEffect(() => {
          if (localStorage.getItem("token")) {
               getCurrentUser();
          } else {
               navigate("/login");
          }
     }, []);

     // ✅ Quy tắc chặn quyền
     if (user) {
          const path = location.pathname;
          if (user.isAdmin && path.startsWith("/user")) {
               // message.error("Admin không được truy cập trang người dùng!");
               navigate("/notfound");
               return null;
          }
          if (!user.isAdmin && path.startsWith("/admin")) {
               message.error("You do not have permission to access this page!");
               navigate("/notfound");
               return null;
          }
     }

     return user && (
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
                         {/* <i className="ri-user-line text-primary cursor-pointer" style={{ fontSize: "20px" }} onClick={() => {
                              navigate("/profile");
                         }}></i>
                         <h1 className="text-sm underline" style={{ fontSize: "20px" }}>{user.username}</h1>
                         <i className="ri-logout-circle-r-line ml-2 cursor-pointer" style={{ fontSize: "20px" }}
                              onClick={() => {
                                   localStorage.removeItem("token");
                                   navigate("/login");
                              }}></i> */}

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
