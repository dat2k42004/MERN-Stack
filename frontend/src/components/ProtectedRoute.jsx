import React from 'react'
import { message } from "antd";
import { useState, useEffect } from "react";
import { GetCurrentUser } from '../apicalls/users'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/loadersSlide';
function ProtectedRoute({ children }) {
     const { user } = useSelector((state) => state.users);
     const Navigate = useNavigate();
     // const [user, setUser] = useState(null);
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
               }
          } catch (error) {
               dispatch(HideLoading());
               dispatch(SetUser(null));
               message.error(error.message);
          }
     }

     useEffect(() => {
          if (localStorage.getItem("token")) {
               getCurrentUser();
          } else {
               Navigate("/login");
          }
     }, []);
     return user && (
          <div className="layout p-1">
               <div className="header bg-primary flex justify-between p-2">
                    <div>
                         <h1 className="text-2xl text-white cursor-pointer" style={{ fontSize: "30px" }}
                         onClick={() => {
                              Navigate("/");
                         }}>
                              MOVIEBOOKING
                         </h1>
                    </div>
                    <div className="bg-white p-1 flex gap-1">
                         <i className="ri-user-line text-primary cursor-pointer" style={{ fontSize: "20px" }} onClick={() => {
                              if (user.isAdmin) {
                                   Navigate("/admin");
                              }
                              else {
                                   Navigate("/profile");
                              }
                         }}></i>
                         <h1 className="text-sm underline" style={{ fontSize: "20px" }}
                         // onClick={() => {
                         //      if (user.isAdmin) {
                         //           Navigate("/admin");
                         //      }
                         //      else {
                         //           Navigate("/profile");
                         //      }
                         // }}
                         >
                              {user.username}
                         </h1>
                         <i className="ri-logout-circle-r-line ml-2 cursor-pointer" style={{ fontSize: "20px" }}
                              onClick={() => {
                                   localStorage.removeItem("token");
                                   Navigate("/login");
                              }}
                         >
                         </i>
                    </div>
               </div>
               <div className="content mt-1 p-1">
                    {children}
               </div>
          </div >
     )
}

export default ProtectedRoute