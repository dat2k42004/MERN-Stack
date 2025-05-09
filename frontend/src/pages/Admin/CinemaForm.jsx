import React from 'react'
import { Modal, Form, Row, Col, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { AddCinema, UpdateCinema, DeleteCinema }  from '../../apicalls/cinemas';
function CinemaForm({
     showCinemaFormModal,
     setShowCinemaFormModal,
     selectedCinema,
     setSelectedCinema,
     getData,
     formType
}) {
     
     const dispatch = useDispatch();
     const onFinish = async (values) => {
          try {
               dispatch(ShowLoading());
               let response = null;

               if (formType === "add") {
                    response = await AddCinema(values);

               } else if (formType === "edit") {
                    response = await UpdateCinema({
                         ...values,
                         _id: selectedCinema._id,
                    })
               } else {
                    response = await DeleteCinema({
                         ...values,
                         _id: selectedCinema._id,
                    })
               }
               if (response.success) {
                    getData();
                    message.success(response.message);
                    setShowCinemaFormModal(false);
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
          setSelectedCinema(null);
     };
     return (
          <Modal title={formType === "add" ? "ADD CINEMA" : (formType === "edit" ? "EDIT CINEMA" : "DELETE CINEMA")}
               open={showCinemaFormModal}
               onCancel={() => {
                    setShowCinemaFormModal(false);
                    setSelectedCinema(null);
               }}
               footer={null}>
               {/* <div>cinema Form</div> */}
               <Form layout='vertical' onFinish={onFinish} initialValues={selectedCinema}>
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item label="Cinema Name" name="name">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="Cinema Address" name="address">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="Cinema Founder" name="founder">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Cinema Star" name="star">
                                   <input type="number" min="1" max="5" placeholder='4'/>
                              </Form.Item>
                         </Col>
                         <Col span={12}>
                              <Form.Item label="Cinema Phone" name="phone">
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
                                   setShowCinemaFormModal(false);
                                   setSelectedCinema(null);
                              }}
                         />
                         <Button title={formType !== "delete" ? "SAVE" : "CONFIRM"} type="submit" />
                    </div>
               </Form>
          </Modal>
     )
}

export default CinemaForm