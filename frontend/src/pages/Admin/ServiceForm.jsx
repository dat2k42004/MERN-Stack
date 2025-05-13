import React from 'react'
import { Modal, Form, Row, Col, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { AddService, UpdateService, DeleteService } from '../../apicalls/services';
function ServiceForm({
     showServiceFormModal,
     setShowServiceFormModal,
     selectedService,
     setSelectedService,
     getData,
     formType
}) {
     const dispatch = useDispatch();
     const onFinish = async (values) => {
          try {
               dispatch(ShowLoading());
               let response = null;

               if (formType === "add") {
                    response = await AddService(values);

               } else if (formType === "edit") {
                    response = await UpdateService({
                         ...values,
                         _id: selectedService._id,
                    })
               } else {
                    response = await DeleteService({
                         ...values,
                         _id: selectedService._id,
                    })
               }
               if (response.success) {
                    getData();
                    message.success(response.message);
                    setShowServiceFormModal(false);
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
          setSelectedService(null);
     };
     return (
          <Modal title={formType === "add" ? "ADD SERVICE" : (formType === "edit" ? "EDIT SERVICE" : "DELETE SERVICE")}
               open={showServiceFormModal}
               onCancel={() => {
                    setShowServiceFormModal(false);
                    setSelectedService(null);
               }}
               footer={null}>
               {/* <div>Service Form</div> */}
               <Form layout='vertical' onFinish={onFinish} initialValues={selectedService}>
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item label="Service Name" name="name">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Service Type" name="type">
                                   <select name="" id="">
                                        <option value="">Select Type</option>
                                        <option value="Corn">Corn</option>
                                        <option value="Coca">Coca</option>
                                        <option value="1Corn + 1Coca">1Corn + 1Coca</option>
                                        <option value="1Corn + 2Coca">1Corn + 2Coca</option>
                                        <option value="2Corn + 3Coca">2Corn + 3Coca</option>
                                   </select>
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Service Price" name="price">
                                   <input type="number" placeholder='1000' />
                              </Form.Item>
                         </Col>
                         
                    </Row>

                    <div className="flex justify-end gap-1">
                         <Button
                              title="CANCEL"
                              type="button"
                              variant="outlined"
                              onClick={() => {
                                   setShowServiceFormModal(false);
                                   setSelectedService(null);
                              }}
                         />
                         <Button title={formType !== "delete" ? "SAVE" : "CONFIRM"} type="submit" />
                    </div>
               </Form>
          </Modal>
     )
}

export default ServiceForm