import React from 'react';
import { useState, useEffect } from "react";
import { GetBill, DeleteBill, UpdateBill } from '../../apicalls/bill';
import { HideLoading, ShowLoading } from '../../redux/loadersSlide';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { message, Row, Col } from 'antd';
import { useLocation } from "react-router-dom";

function History({ user }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState(null);


  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBill(user);
      if (response.success) {
        setData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      return message.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, [location.state]);

  const handleCancel = async (payload) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteBill(payload);
      if (response.success) {
        getData();
        message.success(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handlePayment = async (payload) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateBill(payload);
      if (response.success) {
        getData();
        message.success(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }


  return (
    <div>
      {/* {user._id} */}
      {data && data.map((d) => (
        <div
          style={{
            borderRadius: "4px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
          }}>
          <Row
            gutter={[16, 16]}
            className="mt-2"
          >
            <Col span={6}>
              <div
                className="p-2 card flex flex-col gap-1"
                style={{
                  // borderRadius: "4px",
                  // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
                  border: "none"
                }}>
                <strong>Movie: {d.movie.title}</strong>
                <strong>Cinema: {d.cinema.name}</strong>
                <strong>Room: {d.room.name} ({d.room.type})</strong>
              </div>
            </Col>
            <Col span={6}>
              <div
                className="p-2 card flex flex-col gap-1"
                style={{
                  // borderRadius: "4px",
                  // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
                  border: "none"
                }}>
                <strong>Seat: {d.ticket.map((e) => `[${e.seat}]`)}</strong>
                <strong>Date: {moment(d.schedule.date).format("DD-MM-YYYY")}</strong>
                <strong>Start Time: {d.schedule.startTime}</strong>
              </div>
            </Col>
            <Col span={6}>
              <div
                className="p-2 card flex flex-col gap-1"
                style={{
                  // borderRadius: "4px",
                  // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
                  border: "none"
                }}>
                <strong>Service: {d.service.length > 0 ? d.service.map((e) => `${e.service.type} (${e.quantity}) `) : "No"}</strong>
                <strong>Promotion: {d.promotion ? `Discound ${d.promotion.rate}%` : "No"}</strong>
                <strong>Total Cost: {d.bill.totalCost}VND</strong>
              </div>
            </Col>
            <Col span={6}>
              <div
                className="p-2 card flex flex-col gap-1"
                style={{
                  // borderRadius: "4px",
                  // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
                  border: "none"
                }}>
                {!d.bill.status ? (<>
                  <button
                    // disabled={selectedSeats.length === 0}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                      transition: "0.3s",
                    }}
                    onClick={() => {
                      console.log(d.bill);
                      handlePayment(d.bill);
                    }}
                  >Payment</button>
                  <button
                    // disabled={selectedSeats.length === 0}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                      transition: "0.3s",
                    }}
                    onClick={() => {
                      const payload = {
                        bill: d.bill,
                        ticket: d.ticket,
                        service: d.service,
                        promotion: d.promotion
                      }
                      console.log(payload);
                      handleCancel(payload);
                    }}
                  >Cancel</button>
                </>) : (<strong><h2><i className="ri-check-double-line" style={{ color: "green" }}></i></h2></strong>)}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  )
}

export default History