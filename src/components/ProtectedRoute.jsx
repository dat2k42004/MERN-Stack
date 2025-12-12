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
          }
     }, [navigate, user]); // Chỉ user và navigate là dependencies

     // Thêm một trạng thái loading cục bộ nếu bạn muốn hiển thị spinner trong khi fetch user
     // Trong trường hợp này, bạn đang dùng Redux loadersSlide, nên không cần
     // Tuy nhiên, có thể hiển thị một cái gì đó rỗng nếu user chưa được tải
     // if (!user) {
     //      return null; // Hoặc một component loading
     // }

     // ✅ Quy tắc chặn quyền (giữ nguyên)
     if (user) {
          const path = location.pathname;
          if (!user.isAdmin && path.startsWith("/admin")) {
               message.error("You do not have permission to access this page!");
               navigate("/notfound");
               return null;
          }
     }
     const headerStyle = {
          background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
          padding: '15px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
     };

     const logoStyle = {
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'white',
          cursor: 'pointer',
          margin: 0,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease',
          letterSpacing: '2px',
     };

     const navContainerStyle = {
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
     };

     const navItemStyle = {
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          cursor: 'pointer',
          margin: 0,
          padding: '8px 16px',
          borderRadius: '10px',
          transition: 'all 0.3s ease',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
     };

     const userContainerStyle = {
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
     };

     const userItemStyle = {
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          cursor: 'pointer',
          margin: 0,
          padding: '8px 16px',
          borderRadius: '10px',
          transition: 'all 0.3s ease',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
     };

     const logoutBtnStyle = {
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          cursor: 'pointer',
          margin: 0,
          padding: '8px 16px',
          borderRadius: '10px',
          transition: 'all 0.3s ease',
          background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
          boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
     };

     const loginBtnStyle = {
          fontSize: '18px',
          fontWeight: '600',
          color: 'white',
          cursor: 'pointer',
          margin: 0,
          padding: '8px 20px',
          borderRadius: '10px',
          transition: 'all 0.3s ease',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          boxShadow: '0 4px 12px rgba(245, 87, 108, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
     };

     return (
          <div className="layout p-1">
               <div style={headerStyle}>
                    <div>
                         <h1
                              style={logoStyle}
                              onClick={() => navigate("/")}
                              onMouseEnter={(e) => {
                                   e.target.style.transform = 'scale(1.05)';
                                   e.target.style.textShadow = '3px 3px 8px rgba(0, 0, 0, 0.5)';
                              }}
                              onMouseLeave={(e) => {
                                   e.target.style.transform = 'scale(1)';
                                   e.target.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.3)';
                              }}
                         >
                              🎬 MOVIEBOOKING
                         </h1>
                    </div>

                    <div style={navContainerStyle}>
                         <h2
                              style={navItemStyle}
                              onClick={() => navigate("/")}
                              onMouseEnter={(e) => {
                                   e.target.style.transform = 'translateY(-2px)';
                                   e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                   e.target.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                   e.target.style.transform = 'translateY(0)';
                                   e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                   e.target.style.boxShadow = 'none';
                              }}
                         >
                              🏠 Home
                         </h2>

                         <h2
                              style={navItemStyle}
                              onClick={() => navigate("/user")}
                              onMouseEnter={(e) => {
                                   e.target.style.transform = 'translateY(-2px)';
                                   e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                   e.target.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                   e.target.style.transform = 'translateY(0)';
                                   e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                   e.target.style.boxShadow = 'none';
                              }}
                         >
                              🎭 Features
                         </h2>

                         {user && user?.isAdmin && (
                              <h2
                                   style={navItemStyle}
                                   onClick={() => navigate("/admin")}
                                   onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.3)';
                                   }}
                                   onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.target.style.boxShadow = 'none';
                                   }}
                              >
                                   🗃  Manage
                              </h2>
                         )}
                    </div>

                    {user ? (
                         <div style={userContainerStyle}>
                              <h2
                                   style={userItemStyle}
                                   onClick={() => navigate("/profile")}
                                   onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.3)';
                                   }}
                                   onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                        e.target.style.boxShadow = 'none';
                                   }}
                              >
                                   👤 {user.username}
                              </h2>
                              <h2
                                   style={logoutBtnStyle}
                                   onClick={() => {
                                        localStorage.removeItem("token");
                                        dispatch(SetUser(null));
                                        message.success("Đăng xuất thành công!");
                                        navigate("/");
                                   }}
                                   onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.5)';
                                   }}
                                   onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
                                   }}
                              >
                                   🚪 Logout
                              </h2>
                         </div>
                    ) : (
                         <div style={userContainerStyle}>
                              <h2
                                   style={loginBtnStyle}
                                   onClick={() => {
                                        navigate("/login");
                                   }}
                                   onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(245, 87, 108, 0.6)';
                                   }}
                                   onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(245, 87, 108, 0.4)';
                                   }}
                              >
                                   🔑 Login
                              </h2>
                         </div>
                    )}
               </div>
               <div className="content mt-1 p-1">
                    {React.cloneElement(children, { user })}
               </div>
          </div>
     )
}

export default ProtectedRoute;