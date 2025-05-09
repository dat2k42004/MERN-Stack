import React, {useState} from 'react'
import { Modal, Form, Row, Col, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { AddSchedule, UpdateSchedule, DeleteSchedule } from '../../apicalls/schedules';
import moment from 'moment';
function ScheduleForm({
  showScheduleFormModal,
  setShowScheduleFormModal,
  selectedSchedule,
  setSelectedSchedule,
  movies,
  cinemas,
  rooms,
  getSchedule,
  formType
}) {
  if (selectedSchedule) {
    selectedSchedule.date = moment(selectedSchedule.date).format("YYYY-MM-DD");
    // selectedSchedule.startTime = moment(selectedSchedule.startTime).format("HH:mm")
  }
  const dispatch = useDispatch();
  const [keyCinema, setKeyCinema] = useState(null);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;

      if (formType === "add") {
        response = await AddSchedule(values);
      } else if (formType === "edit") {
        response = await UpdateSchedule({
          ...values,
          _id: selectedSchedule._id,
        })
      } else {
        response = await DeleteSchedule({
          ...values,
          _id: selectedSchedule._id,
        })
      }
      if (response.success) {
        getSchedule();
        message.success(response.message);
        setShowScheduleFormModal(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
    setSelectedSchedule(null);
  };
  return (
    <Modal title={formType === "add" ? "ADD SCHEDULE" : (formType === "edit" ? "EDIT SCHEDULE" : "DELETE SCHEDULE")}
      open={showScheduleFormModal}
      onCancel={() => {
        setShowScheduleFormModal(false);
        setSelectedSchedule(null);
      }}
      footer={null}>
      {/* <div>Schedule Form</div> */}
      <Form layout='vertical' onFinish={onFinish} initialValues={selectedSchedule}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Movie" name="movie_id">
              <select name="" id="">
                <option value="">Select Movie</option>
                {movies && movies.map((e) => (
                  <option value={e._id}>{e.title}</option>
                ))}
              </select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Cinema" name="cinema_id">
              <select name="" id="" value={keyCinema} onChange={(e) => setKeyCinema(e.target.value)}>
                <option value="">Select Cinema</option>
                {cinemas && cinemas.map((e) => (
                  <option value={e._id}>{e.name}</option>
                ))}
              </select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Room" name="room_id">
              <select name="" id="">
                <option value="">Select Room</option>
                {keyCinema && rooms.filter((e) => e.cinema_id === keyCinema).map((e) => (
                  <option value={e._id}>{e.name}</option>
                ))}
              </select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date" name="date">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="StartTime" name="startTime">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Price" name="price">
              <input type="number" placeholder='1000' min="1000"/>
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-1">
          <Button
            title="CANCEL"
            type="button"
            variant="outlined"
            onClick={() => {
              setShowScheduleFormModal(false);
              setSelectedSchedule(null);
            }}
          />
          <Button title={formType !== "delete" ? "SAVE" : "CONFIRM"} type="submit" />
        </div>
      </Form>
    </Modal>
  )
}

export default ScheduleForm;