import React from 'react'
import { Modal, Form, Row, Col, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { AddPromotion, UpdatePromotion, DeletePromotion } from '../../apicalls/promotions';
import moment from 'moment';
function PromotionForm({
     showPromotionFormModal,
     setShowPromotionFormModal,
     selectedPromotion,
     setSelectedPromotion,
     getData,
     formType
}) {
     if (selectedPromotion) {
          selectedPromotion.date = moment(selectedPromotion.date).format("YYYY-MM-DD");
     }
     const dispatch = useDispatch();
     const onFinish = async (values) => {
          try {
               dispatch(ShowLoading());
               let response = null;

               if (formType === "add") {
                    response = await AddPromotion(values);

               } else if (formType === "edit") {
                    response = await UpdatePromotion({
                         ...values,
                         _id: selectedPromotion._id,
                    })
               } else {
                    response = await DeletePromotion({
                         ...values,
                         _id: selectedPromotion._id,
                    })
               }
               if (response.success) {
                    getData();
                    message.success(response.message);
                    setShowPromotionFormModal(false);
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
          setSelectedPromotion(null);
     };
     return (
          <Modal title={formType === "add" ? "ADD PROMOTION" : (formType === "edit" ? "EDIT PROMOTION" : "DELETE PROMOTION")}
               open={showPromotionFormModal}
               onCancel={() => {
                    setShowPromotionFormModal(false);
                    setSelectedPromotion(null);
               }}
               footer={null}>
               {/* <div>Promotion Form</div> */}
               <Form layout='vertical' onFinish={onFinish} initialValues={selectedPromotion}>
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item label="Promotion Name" name="name">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Promotion Number" name="number">
                                   <input type="number" placeholder='1' min='1'/>
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Promotion Active" name="active">
                                   <select name="" id="">
                                        <option value="true">Action</option>
                                        <option value="false">Stop</option>
                                   </select>
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Promotion Date" name="date">
                                   <input type="date" />
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Promotion Rate" name="rate">
                                   <input type="number" placeholder='1' min="1" max="50"/>
                              </Form.Item>
                         </Col>
                         
                    </Row>

                    <div className="flex justify-end gap-1">
                         <Button
                              title="CANCEL"
                              type="button"
                              variant="outlined"
                              onClick={() => {
                                   setShowPromotionFormModal(false);
                                   setSelectedPromotion(null);
                              }}
                         />
                         <Button title={formType !== "delete" ? "SAVE" : "CONFIRM"} type="submit" />
                    </div>
               </Form>
          </Modal>
     )
}

export default PromotionForm