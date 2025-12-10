import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                        <Link
                            to="/register"
                            style={linkStyle}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#009999';
                                e.target.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#006666';
                                e.target.style.textDecoration = 'none';
                            }}
                        >
                            Chưa có tài khoản? <strong>Đăng ký ngay</strong>
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    )
};

export default Login;