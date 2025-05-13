import React from 'react';
import { useState, useEffect } from "react";
import { GetBill } from '../../apicalls/bill';
import { HideLoading, ShowLoading } from '../../redux/loadersSlide';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { message, Row, Col } from 'antd';

function History({ user }) {
  const dispatch = useDispatch();
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
  }, []);


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

                    }}
                  >Payment</button>
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

                    }}
                  >Cancel</button>
                </>) : (<strong>Paid</strong>)}
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  )
}

export default History