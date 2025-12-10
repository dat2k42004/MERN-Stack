import React from 'react'
import { Modal, Form, Row, Col, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { AddRoom, UpdateRoom, DeleteRoom } from '../../apicalls/rooms';
function RoomForm({
     showRoomFormModal,
     setShowRoomFormModal,
     selectedRoom,
     selectedCinema,
     setSelectedRoom,
     getData,
     formType
}) {

     const dispatch = useDispatch();
     const onFinish = async (values) => {
          try {
               dispatch(ShowLoading());
               let response = null;

               if (formType === "add") {
                    response = await AddRoom({
                         ...values,
                         cinema_id: selectedCinema._id,
                    });

               } else if (formType === "edit") {
                    response = await UpdateRoom({
                         ...values,
                         _id: selectedRoom._id,
                    })
               } else {
                    response = await DeleteRoom({
                         ...values,
                         _id: selectedRoom._id,
                    })
               }
               if (response.success) {
                    getData();
                    message.success(response.message);
                    setShowRoomFormModal(false);
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
     };
     return (
          <Modal title={formType === "add" ? "ADD ROOM" : (formType === "edit" ? "EDIT ROOM" : "DELETE ROOM")}
               open={showRoomFormModal}
               onCancel={() => {
                    setShowRoomFormModal(false);
                    setSelectedRoom(null);
               }}
               footer={null}>
               {/* <div>Room Form</div> */}
               <Form
                    layout='vertical'
                    onFinish={onFinish}
                    initialValues={
                         formType === "add"
                              ? { cinema_id: selectedCinema._id }
                              : { ...selectedRoom, cinema_id: selectedCinema._id }
                    }
               >
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item label="Room Name" name="name">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={8}>
                              <Form.Item label="Room Type" name="type">
                                   <select name="" id="">
                                        <option value="">Select Room Type</option>
                                        <option value="3D">3D</option>
                                        <option value="2D">2D</option>
                                        <option value="IMAX">IMAX</option>
                                        <option value="4DX">4DX</option>
                                        <option value="LUXE">LUXE</option>
                                   </select>
                              </Form.Item>
                         </Col>
                         <Col span={8}>
                              <Form.Item label="Room Quantity" name="quantity">
                                   <input type="number" min="1" placeholder='1' />
                              </Form.Item>
                         </Col>

                         <Col span={8}>
                              <Form.Item label="Room Active" name="active">
                                   <select name="" id="">
                                        <option value="true">Action</option>
                                        <option value="false">Stop</option>
                                   </select>
                              </Form.Item>
                         </Col>
                         <Col span={8}>
                              <Form.Item name="cinema_id" initialValue={selectedCinema._id} hidden>
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                    </Row>

                    <div className="flex justify-end gap-1">
                         <Button
                              title="CANCEL"
                              type="button"
                              variant="outlined"
                              onClick={() => {
                                   setShowRoomFormModal(false);
                                   setSelectedRoom(null);
                              }}
                         />
                         <Button title={formType !== "delete" ? "SAVE" : "CONFIRM"} type="submit" />
                    </div>
               </Form>
          </Modal>
     )
}

export default RoomForm