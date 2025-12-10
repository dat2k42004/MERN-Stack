import React, { useState } from 'react';
import EditProfile from './EditProfile';

function Profile({ user }) {
     const [showEditForm, setShowEditForm] = useState(false);
     const [currentUser, setCurrentUser] = useState(user);

     const pageStyle = {
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
     };

     const containerStyle = {
          maxWidth: '600px',
          width: '100%',
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          animation: 'scaleIn 0.5s ease-out',
     };

     const headerStyle = {
          textAlign: 'center',
          marginBottom: '30px',
     };

     const titleStyle = {
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#006666',
          margin: '0 0 10px 0',
          background: 'linear-gradient(135deg, #006666 0%, #009999 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
     };

     const dividerStyle = {
          border: 'none',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #009999, transparent)',
          margin: '20px 0',
     };

     const infoSectionStyle = {
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
          marginBottom: '30px',
     };

     const infoItemStyle = {
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '20px',
          borderRadius: '12px',
          border: '2px solid #e0e0e0',
          transition: 'all 0.3s ease',
     };

     const labelStyle = {
          fontSize: '14px',
          color: '#666',
          fontWeight: '600',
          marginBottom: '8px',
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '1px',
     };

     const valueStyle = {
          fontSize: '20px',
          color: '#006666',
          fontWeight: 'bold',
          display: 'block',
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
     };

     const iconStyle = {
          fontSize: '24px',
     };

     return (
          <div style={pageStyle}>
               {!showEditForm && (
                    <div style={containerStyle}>
                         <div style={headerStyle}>
                              <h2 style={titleStyle}>👤 Hồ Sơ Của Bạn</h2>
                              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                                   Thông tin tài khoản cá nhân
                              </p>
                         </div>

                         <hr style={dividerStyle} />

                         <div style={infoSectionStyle}>
                              <div
                                   style={infoItemStyle}
                                   onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                        e.currentTarget.style.borderColor = '#009999';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 153, 153, 0.2)';
                                   }}
                                   onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.borderColor = '#e0e0e0';
                                        e.currentTarget.style.boxShadow = 'none';
                                   }}
                              >
                                   <span style={labelStyle}>👤 Tên đăng nhập</span>
                                   <span style={valueStyle}>{currentUser.username}</span>
                              </div>

                              <div
                                   style={infoItemStyle}
                                   onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                        e.currentTarget.style.borderColor = '#009999';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 153, 153, 0.2)';
                                   }}
                                   onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.borderColor = '#e0e0e0';
                                        e.currentTarget.style.boxShadow = 'none';
                                   }}
                              >
                                   <span style={labelStyle}>📧 Email</span>
                                   <span style={valueStyle}>{currentUser.email}</span>
                              </div>
                         </div>

                         <button
                              style={buttonStyle}
                              onClick={() => setShowEditForm(true)}
                              onMouseEnter={(e) => {
                                   e.target.style.transform = 'translateY(-3px)';
                                   e.target.style.boxShadow = '0 8px 30px rgba(0, 102, 102, 0.6)';
                              }}
                              onMouseLeave={(e) => {
                                   e.target.style.transform = 'translateY(0)';
                                   e.target.style.boxShadow = '0 6px 20px rgba(0, 102, 102, 0.4)';
                              }}
                         >
                              <span style={iconStyle}>🔐</span>
                              Đổi mật khẩu
                         </button>
                    </div>
               )}

               {showEditForm && (
                    <EditProfile
                         user={currentUser}
                         setUser={setCurrentUser}
                         setShowEditForm={setShowEditForm}
                         showEditForm={showEditForm}
                    />
               )}
          </div>
     );
}

export default Profile;
