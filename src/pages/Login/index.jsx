import React, { useEffect, useRef } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, LoginGoogle } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import { GoogleLogin } from "@react-oauth/google";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const googleButtonRef = useRef(null);

    const onFinish = async (values) => {
        // console.log("Success: ", values);
        try {
            dispatch(ShowLoading());
            const response = await LoginUser(values);
            dispatch(HideLoading());
            if (response.success) {
                message.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/";
            } else {
                message.error(response.message);
            }
        }
        catch (error) {
            dispatch(HideLoading());
            message.error(error?.message);
        }
    }

    const handleLoginGoogle = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const payload = {
                token: token,
            }
            const response = await LoginGoogle(payload);
            if (response?.success) {
                message.success(response?.message);
                localStorage.setItem("token", response?.data);
                window.location.href = "/";
            }
            else {
                message.error(response?.message);
            }
        }
        catch (error) {
            message.error(error?.message);
        }
    }

    const triggerGoogleLogin = () => {
        // Find and click the hidden Google login button
        const googleBtn = googleButtonRef.current?.querySelector('div[role="button"]');
        if (googleBtn) {
            googleBtn.click();
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
        padding: '20px',
    };

    const cardStyle = {
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideIn 0.5s ease-out',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '30px',
    };

    const titleStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#006666',
        margin: '0 0 10px 0',
        background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '1px',
    };

    const iconStyle = {
        fontSize: '48px',
        marginBottom: '10px',
    };

    const dividerStyle = {
        border: 'none',
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #009999, transparent)',
        margin: '20px 0',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        fontSize: '15px',
        border: '2px solid #e0e0e0',
        borderRadius: '10px',
        outline: 'none',
        transition: 'all 0.3s ease',
        backgroundColor: '#f8f9fa',
    };

    const buttonStyle = {
        width: '100%',
        padding: '14px 24px',
        background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        boxShadow: '0 6px 20px rgba(0, 102, 102, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    };

    const linkStyle = {
        textAlign: 'center',
        marginTop: '15px',
        color: '#006666',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
    };

    // Inject CSS for animations and form styling
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .login-form input:focus {
                border-color: #009999 !important;
                background-color: white !important;
                box-shadow: 0 0 0 3px rgba(0, 153, 153, 0.1) !important;
            }
            
            .login-form .ant-form-item-label > label {
                color: #006666 !important;
                font-weight: 600 !important;
                font-size: 14px !important;
            }
            
            .login-form .ant-form-item {
                margin-bottom: 20px !important;
            }
            
            .login-form .ant-form-item-explain-error {
                color: #dc3545 !important;
                font-size: 13px !important;
                margin-top: 5px !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <div style={iconStyle}>🎬</div>
                    <h1 style={titleStyle}>MOVIE BOOKING</h1>
                    <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                        Đăng nhập để đặt vé xem phim
                    </p>
                </div>

                <hr style={dividerStyle} />

                <Form
                    layout="vertical"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="📧 Email hoặc Tên đăng nhập"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập email hoặc tên đăng nhập!" }]}
                    >
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Nhập email hoặc username..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="🔒 Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <input
                            type="password"
                            style={inputStyle}
                            placeholder="Nhập mật khẩu..."
                        />
                    </Form.Item>

                    <div style={{ marginTop: '25px' }}>
                        <button
                            type="submit"
                            style={buttonStyle}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 8px 30px rgba(0, 102, 102, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 6px 20px rgba(0, 102, 102, 0.4)';
                            }}
                        >
                            🚀 Đăng nhập
                        </button>


                    </div>
                </Form>

                <div style={{ margin: '25px 0', textAlign: 'center', position: 'relative' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '20px 0',
                        color: '#999'
                    }}>
                        <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
                        <span style={{ padding: '0 15px', fontSize: '13px', fontWeight: '500' }}>
                            HOẶC
                        </span>
                        <div style={{ flex: 1, height: '1px', background: '#ddd' }}></div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={triggerGoogleLogin}
                    style={{
                        width: '100%',
                        padding: '14px 24px',
                        background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 6px 20px rgba(0, 102, 102, 0.4)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        marginBottom: '20px'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 8px 30px rgba(0, 102, 102, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 6px 20px rgba(0, 102, 102, 0.4)';
                    }}
                >
                    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    Đăng nhập với Google
                </button>

                {/* Hidden Google Login Button */}
                <div ref={googleButtonRef} style={{ display: 'none' }}>
                    <GoogleLogin
                        onSuccess={handleLoginGoogle}
                        onError={() => message.error("Đăng nhập thất bại")}
                    />
                </div>

                <Link
                    to="/register"
                    style={linkStyle}

                >
                    Chưa có tài khoản? <strong>Đăng ký ngay</strong>
                </Link>
            </div>
        </div>
    )
};

export default Login;