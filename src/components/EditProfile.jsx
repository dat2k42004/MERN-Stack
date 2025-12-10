import React from 'react';

import { Modal, Form, Row, Col, message } from 'antd';
import Button from "./Button";
import { SetUser } from '../redux/usersSlice';
import { ShowLoading, HideLoading } from '../redux/loadersSlide';
import { useDispatch } from 'react-redux';
import { ChangePassword } from '../apicalls/users';

function EditProfile({ user, showEditForm, setShowEditForm, setUser }) {
     const dispatch = useDispatch();

     const handleSubmit = async (values) => {
          try {
               dispatch(ShowLoading());
               const response = await ChangePassword({
                    ...values,
                    _id: user._id
               });

               dispatch(HideLoading());

               if (response.success) {
                    message.success(response.message);

                    // ✅ Cập nhật user mới cho component cha
                    if (response.data) {
                         setUser(response.data);
                    }

                    setShowEditForm(false);
               } else {
                    message.error(response.message);
               }
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
     };

     return (
          <div>
               <Modal open={showEditForm}
                    onCancel={() => setShowEditForm(false)}
                    footer={null}
               >
                    <Form layout='vertical' onFinish={handleSubmit} initialValues={user}>
                         <Row gutter={16}>
                              <Col span={24}>
                                   <Form.Item label="Old Password" name="old">
                                        <input type="password" />
                                   </Form.Item>
                              </Col>
                              <Col span={24}>
                                   <Form.Item label="New Password" name="new">
                                        <input type="password" />
                                   </Form.Item>
                              </Col>
                         </Row>

                         <div className="flex justify-end gap-1">
                              <Button
                                   title="CANCEL"
                                   type="button"
                                   variant="outlined"
                                   onClick={() => {
                                        setShowEditForm(false)
                                   }}
                              />
                              <Button title='SAVE' type="submit" />
                         </div>
                    </Form>
               </Modal>
          </div>
     )
}

export default EditProfile