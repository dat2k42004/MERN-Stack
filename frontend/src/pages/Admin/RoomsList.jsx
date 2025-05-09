import React from 'react';
import Button from '../../components/Button';
import { useState, useEffect } from "react";
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllRooms } from '../../apicalls/rooms';
import RoomForm from './RoomForm';

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
               title: "Action",
               dataIndex: "action",
               render: (text, record) => {
                    return (
                         <div className="flex gap-1">
                              <i class="ri-edit-line" style={{ color: "blue" }}
                                   onClick={() => {
                                        setSelectedRoom(record);
                                        setFormType("edit");
                                        setShowRoomFormModal(true);
                                   }}></i>
                              <i class="ri-delete-bin-line" style={{ color: "red" }}
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
          <div>
               <div className="flex justify-between items-center mb-4">
                    <Button
                         title="Back"
                         variant="outlined"
                         onClick={() => {
                              setShowRoomModal(false);
                              setSelectedCinema(null);
                         }}
                    />

                    <h2 className="text-xl font-semibold">{selectedCinema.name}</h2>

                    <Button
                         title="Add Room"
                         variant="outlined"
                         onClick={() => {
                              setShowRoomFormModal(true);
                              setFormType("add");
                         }}
                    />
               </div>
               <Table columns={columns} dataSource={rooms} />

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