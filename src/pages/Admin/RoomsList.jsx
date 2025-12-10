import React from 'react';
import Button from '../../components/Button';
import { useState, useEffect } from "react";
import { Table, message } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllRooms } from '../../apicalls/rooms';
import RoomForm from './RoomForm';
import '../../assets/css/AdminList.css';

function RoomsList({ showRoomModal, setShowRoomModal, selectedCinema, setSelectedCinema }) {
     const [rooms, setRooms] = useState([]);
     // const [showRoomModal, setShowRoomModal] = useState(false);
     const [showRoomFormModal, setShowRoomFormModal] = useState(false);
     const [selectedRoom, setSelectedRoom] = useState(null);
     const [formType, setFormType] = useState("add");


     const dispatch = useDispatch();

     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllRooms();
               if (response.success) {
                    // Lọc theo rạp
                    const filteredRooms = response.data.filter(
                         (room) => room.cinema_id === selectedCinema._id
                    );
                    setRooms(filteredRooms);
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
     };


     useEffect(() => {
          getData();
     }, []);

     const columns = [
          {
               title: "Name",
               dataIndex: "name",
          },
          {
               title: "Type",
               dataIndex: "type",
          },
          {
               title: "Quantity",
               dataIndex: "quantity",
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
                         <div className="admin-action-icons">
                              <i className="ri-edit-line"
                                   onClick={() => {
                                        setSelectedRoom(record);
                                        setFormType("edit");
                                        setShowRoomFormModal(true);
                                   }}></i>
                              <i className="ri-delete-bin-line"
                                   onClick={() => {
                                        setSelectedRoom(record);
                                        setFormType("delete");
                                        setShowRoomFormModal(true);
                                   }}
                              ></i>
                         </div>
                    )
               }
          }
     ]
     return (
          <div className="admin-list-container rooms-list-container">
               <div className="rooms-list-header">
                    <button
                         className="admin-back-button"
                         onClick={() => {
                              setShowRoomModal(false);
                              setSelectedCinema(null);
                         }}
                    >
                         <i className="ri-arrow-left-line"></i>
                         Quay Lại
                    </button>

                    <h2 className="rooms-cinema-title">
                         <i className="ri-building-line"></i>
                         {selectedCinema.name}
                    </h2>

                    <button
                         className="admin-add-button"
                         onClick={() => {
                              setShowRoomFormModal(true);
                              setFormType("add");
                         }}
                    >
                         <i className="ri-add-line"></i>
                         Thêm Phòng
                    </button>
               </div>

               <Table
                    columns={columns}
                    dataSource={rooms}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
               />

               {showRoomFormModal &&
                    <RoomForm
                         showRoomFormModal={showRoomFormModal}
                         setShowRoomFormModal={setShowRoomFormModal}
                         selectedRoom={selectedRoom}
                         setSelectedRoom={setSelectedRoom}
                         selectedCinema={selectedCinema}
                         formType={formType}
                         getData={getData}
                    />}
          </div >
     )
}

export default RoomsList