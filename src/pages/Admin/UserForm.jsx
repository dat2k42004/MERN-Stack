import React from 'react'
import { Modal, Form, Row, Col, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { UpdateUser, DeleteUser } from '../../apicalls/users';
function UserForm({
     showUserFormModal,
     setShowUserFormModal,
     selectedUser,
     setSelectedUser,
     getData,
     formType
}) {
     const dispatch = useDispatch();
     const onFinish = async (values) => {
          try {
               dispatch(ShowLoading());
               let response = null;

               if (formType === "edit") {
                    response = await UpdateUser({
                         ...values,
                         _id: selectedUser._id,
                    })
               } else {
                    response = await DeleteUser({
                         ...values,
                         _id: selectedUser._id,
                    })
               }
               if (response.success) {
                    getData();
                    message.success(response.message);
                    setShowUserFormModal(false);
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
          setSelectedUser(null);
     };
     return (
          <Modal title={formType === "edit" ? "UPDATE User" : "DELETE User"}
               open={showUserFormModal}
               onCancel={() => {
                    setShowUserFormModal(false);
                    setSelectedUser(null);
               }}
               footer={null}>
               {/* <div>User Form</div> */}
               <Form layout='vertical' onFinish={onFinish} initialValues={selectedUser}>
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item label="User Name" name="username">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="User Email" name="email">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="Password" name="password" hidden>
                                   <input type="text" disabled={true} />
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="User Active" name="active">
                                   <select name="" id="">
                                        <option value="true">Action</option>
                                        <option value="false">Stop</option>
                                   </select>
                              </Form.Item>
                         </Col>
                    </Row>

                    <div className="flex justify-end gap-1">
                         <Button
                              title="CANCEL"
                              type="button"
                              variant="outlined"
                              onClick={() => {
                                   setShowUserFormModal(false);
                                   setSelectedUser(null);
                              }}
                         />
                         <Button title={formType !== "delete" ? "SAVE" : "CONFIRM"} type="submit" />
                    </div>
               </Form>
          </Modal>
     )
}

export default UserForm