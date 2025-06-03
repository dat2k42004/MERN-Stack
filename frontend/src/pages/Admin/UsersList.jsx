import React, { useEffect } from 'react'
import UserForm from './UserForm';
import { useState } from "react";
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllUsers } from '../../apicalls/users';

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
                    return record.active ? "Action" : "Stop";
               }
          },
          {
               title: "Action",
               dataIndex: "action",
               render: (text, record) => {
                    return (
                         <>
                              {!record.isAdmin && (<div className="flex gap-1">
                                   <i class="ri-edit-line" style={{ color: "blue" }}
                                        onClick={() => {
                                             setSelectedUser(record);
                                             setFormType("edit");
                                             setShowUserFormModal(true);
                                        }}></i>
                                   <i class="ri-delete-bin-line" style={{ color: "red" }}
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
          <div>
               <Table columns={columns} dataSource={Users} />

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