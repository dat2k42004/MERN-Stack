import React, { useState } from 'react';
import EditProfile from './EditProfile';

function Profile({ user }) {
     const [showEditForm, setShowEditForm] = useState(false);
     const [currentUser, setCurrentUser] = useState(user); // ✅

     return (
          <div>
               {!showEditForm && (
                    <div className="flex justify-center items-center">
                         <div className="p-2 card flex flex-col gap-1 cursor-pointer" style={{ borderRadius: "4px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}>
                              <h2>Your Profile</h2>
                              <hr />
                              <strong>Username: {currentUser.username}</strong>
                              <br />
                              <strong>Email: {currentUser.email}</strong>
                              <button
                                   style={{
                                        padding: "6px 12px",
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        transition: "0.3s",
                                   }}
                                   onClick={() => setShowEditForm(true)}
                              >Change Password</button>
                         </div>
                    </div>
               )}

               {showEditForm && (
                    <EditProfile
                         user={currentUser}
                         setUser={setCurrentUser} // ✅ truyền xuống
                         setShowEditForm={setShowEditForm}
                         showEditForm={showEditForm}
                    />
               )}
          </div>
     );
}

export default Profile;
