import React, { useEffect } from 'react'
import UserForm from './UserForm';
import { useState } from "react";
import { Table, message } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllUsers } from '../../apicalls/users';
import '../../assets/css/AdminList.css';

function UsersList() {
     const [Users, setUsers] = useState([]);
     const [showUserFormModal, setShowUserFormModal] = useState(false);
     const [selectedUser, setSelectedUser] = useState(null);
     const [formType, setFormType] = useState("edit");


     const dispatch = useDispatch();

     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllUsers();
               if (response.success) {
                    setUsers(response.data);
               }
               else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
     }

     useEffect(() => {
          getData();
     }, []);

     const columns = [
          {
               title: "Username",
               dataIndex: "username",
          },
          {
               title: "Email",
               dataIndex: "email",
          },
          {
               title: "Active",
               dataIndex: "active",
               render: (text, record) => {
                    return (
                         <span className={`status-badge ${record.active ? 'active' : 'inactive'}`}>
                              {record.active ? "Active" : "Inactive"}
                         </span>
                    );
               }
          },
          {
               title: "Action",
               dataIndex: "action",
               render: (text, record) => {
                    return (
                         <>
                              {!record.isAdmin && (<div className="admin-action-icons">
                                   <i className="ri-edit-line"
                                        onClick={() => {
                                             setSelectedUser(record);
                                             setFormType("edit");
                                             setShowUserFormModal(true);
                                        }}></i>
                                   <i className="ri-delete-bin-line"
                                        onClick={() => {
                                             setSelectedUser(record);
                                             setFormType("delete");
                                             setShowUserFormModal(true);
                                        }}
                                   ></i>
                              </div>)}
                         </>
                    )
               }
          }
     ]
     return (
          <div className="admin-list-container">
               <Table
                    columns={columns}
                    dataSource={Users}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
               />

               {showUserFormModal &&
                    <UserForm
                         showUserFormModal={showUserFormModal}
                         setShowUserFormModal={setShowUserFormModal}
                         selectedUser={selectedUser}
                         setSelectedUser={setSelectedUser}
                         formType={formType}
                         getData={getData}
                    />}
          </div>
     )
}

export default UsersList