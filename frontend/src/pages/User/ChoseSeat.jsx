import React, { useState, useEffect } from 'react';
import { message, Row, Col } from 'antd';
import { GetTicket } from '../../apicalls/tickets';
import { GetAllPromotions } from '../../apicalls/promotions';
import { GetAllServices } from '../../apicalls/services';
import { AddBill } from '../../apicalls/bill';
// import { GetCurrentUser } from '../../apicalls/users'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import Button from '../../components/Button';
import moment from 'moment';
// import History from "./History";

function ChoseSeat({ showChoseSeat, setShowChoseSeat, selectedSchedule, setSelectedSchedule, isActive, user, BookingToHistory }) {
  const [tickets, setTickets] = useState([]);
  const [services, setServices] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const dispatch = useDispatch();
  const [selectedService, setSelectedService] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  // const [showHistory, setShowHistory] = useState(false);

  // const [user, setUser] = useState();
  // const navigate = useNavigate();
  // const location = useLocation();


  // const getCurrentUser = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await GetCurrentUser();
  //     dispatch(HideLoading());
  //     if (response.success) {
  //       dispatch(setUser(response.data));
  //     } else {
  //       dispatch(setUser(null));
  //       message.error(response.message);
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     dispatch(setUser(null));
  //     message.error(error.message);
  //     navigate("/login");
  //   }
  // }

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     getCurrentUser();
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);


  if (!isActive) {
    setShowChoseSeat(false);
  }

  const getTicket = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTicket(selectedSchedule);
      if (response.success) {
        setTickets(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getService = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllServices();
      if (response.success) {
        const initialSelectedServices = response.data.map((e) => ({
          _id: e._id,
          name: e.name,
          type: e.type,
          price: e.price,
          quantity: 0,
        }));
        setSelectedService(initialSelectedServices);
        setServices(response.data); // Bạn vẫn cần set state services để hiển thị tên dịch vụ
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };



  const getPromotion = async () => {

    try {
      dispatch(ShowLoading());
      const response = await GetAllPromotions();
      if (response.success) {
        setPromotions(response.data.filter((e) => e.date.localeCompare(moment(new Date()).format("YYYY-MM-DD")) >= 0));
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleSeatToggle = (id) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((seatId) => seatId !== id) : [...prev, id]
    );
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const totalCost = (selectedSeats.length * (tickets[0]?.price || 0) + selectedService.reduce((cur, arr) => cur + arr.price * arr.quantity, 0)) * (selectedPromotion ? (100 - selectedPromotion.rate) : 100) / 100;
    const payload = {
      date: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      user: user,
      ticket: selectedSeats,
      service: selectedService,
      promotion: selectedPromotion,
      totalCost: totalCost
    };
    console.log(payload);
    try {
      dispatch(ShowLoading());
      const response = await AddBill(payload);
      if (response.success) {
        message.success(response.message);
        BookingToHistory();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }


  useEffect(() => {
    getTicket();
    getService();
    getPromotion();
  }, []);

  return (
    <div>
      {/* <Button
        title="Back"
        variant="outlined"
        onClick={() => {
          setShowChoseSeat(false);
          setSelectedSchedule(null);
        }}
      /> */}
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
          setShowChoseSeat(false);
          setSelectedSchedule(null);
        }}
      >Back</button>
      <div
        className="p-2 card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "4px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          width: "50%",
          margin: "0 auto",
          padding: "8px 16px", // giảm padding
          height: "80px", // đặt chiều cao cụ thể (hoặc bỏ nếu muốn tự co)
        }}
      >
        {/* Cột trái */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {/* <h2 style={{ margin: 0 }}>Cost</h2> */}
          <h1 style={{ margin: 0, fontSize: "20px" }}>
            Total: {
              (selectedSeats.length * (tickets[0]?.price || 0) + selectedService.reduce((cur, arr) => cur + arr.price * arr.quantity, 0)) * (selectedPromotion ? (100 - selectedPromotion.rate) : 100) / 100
            } VND
          </h1>
        </div>

        {/* Cột phải */}
        <button
          disabled={selectedSeats.length === 0}
          style={{
            padding: "6px 12px",
            backgroundColor: selectedSeats.length === 0 ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            transition: "0.3s",
          }}
          onClick={(e) => {
            handleBooking(e);
          }}
        >
          BOOKING
        </button>
      </div>


      <Row gutter={[20, 20]} className="mt-2">

        <Col span={12}>
          <div
            className="p-2 card flex flex-col gap-1"
            style={{
              borderRadius: "4px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 className="text-xl mb-2">Seat</h2>

            <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
              {/* Ghế đã chọn */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  disabled
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#52c41a", // xanh lá
                    border: "none",
                    borderRadius: "4px",
                    cursor: "default"
                  }}
                />
                <span>Selected</span>
              </div>

              {/* Ghế đã được đặt */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  disabled
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#d9d9d9", // xám
                    border: "none",
                    borderRadius: "4px",
                    cursor: "default"
                  }}
                />
                <span>Booked</span>
              </div>

              {/* Ghế trống */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  disabled
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#1890ff", // xanh dương
                    border: "none",
                    borderRadius: "4px",
                    cursor: "default"
                  }}
                />
                <span>Available</span>
              </div>
            </div>


            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
                gap: "10px",

              }}
            >
              {tickets.map((ticket) => (
                <button
                  key={ticket._id}
                  onClick={() => handleSeatToggle(ticket._id)}
                  disabled={ticket.status === true} // không cho chọn nếu đã đặt
                  style={{
                    padding: "15px",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    width: "60px",
                    margin: "10px",
                    backgroundColor: ticket.status
                      ? "#d9d9d9" // đã đặt
                      : selectedSeats.includes(ticket._id)
                        ? "#52c41a" // đang chọn
                        : "#1890ff", // bình thường
                    color: ticket.status ? "#888" : "#fff",
                    border: "none",
                    cursor: ticket.status ? "not-allowed" : "pointer",
                    transition: "0.3s",
                  }}
                >
                  {ticket.seat}
                </button>
              ))}
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div
            className="p-2 card flex flex-col gap-1"
            style={{
              borderRadius: "4px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 >Service</h2>
            {services && services.map((e) => (
              <div
                className="p-2 card flex flex-row gap-1"
                style={{
                  borderRadius: "4px",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                  width: "90%",
                  height: "40px"
                }}
              >
                <div
                  // className="p-2 card flex flex-col gap-1"
                  className="flex gap-2"
                  style={{
                    borderRadius: "4px",
                    // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    border: "none",
                    width: "90%",
                    height: "10px"
                  }}
                >
                  <strong>{e.type}</strong>
                </div>
                <div
                  // className="p-2 card flex flex-col gap-1"
                  className="flex gap-2"
                  style={{
                    borderRadius: "4px",
                    // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    border: "none",
                    width: "90%",
                    height: "10px"
                  }}
                >
                  <strong>Price: {e.price}</strong>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    disabled={selectedSeats.length === 0}
                    // value={
                    //   selectedServices.find((s) => s._id === services._id)?.quantity || ""
                    // }
                    style={{
                      borderRadius: "4px",
                      width: "40px",
                      backgroundColor: selectedSeats.length === 0 ? "#f5f5f5" : "white",
                      cursor: selectedSeats.length === 0 ? "not-allowed" : "text"
                    }}
                    onChange={(event) => {
                      const { value } = event.target;
                      setSelectedService((prevSelectedServices) =>
                        prevSelectedServices.map((service) =>
                          service._id === e._id ? { ...service, quantity: parseInt(value) || 0 } : service
                        )
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Col>

        <Col span={6}>
          <div className="p-2 card flex flex-col gap-1" style={{ borderRadius: "4px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}>
            <h2 className="text-xl">Promotion</h2>
            {promotions &&
              promotions
                .map((promotion) => (
                  <div
                    key={promotion._id}
                    className={`p-2 cursor-pointer flex items-center gap-4 ${selectedPromotion?._id === promotion._id ? 'bg-blue-100' : 'bg-white'}`}
                    style={{
                      borderRadius: "8px",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                      width: "90%",
                      minHeight: "120px",
                      marginBottom: "10px",
                    }}
                  >

                    <div
                      className="p-2 card flex flex-row gap-1"
                      style={{
                        // borderRadius: "4px",
                        // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                        border: "none",
                        width: "80%"
                      }}
                    >
                      <div className="flex flex-col">
                        <strong>{promotion.name}</strong>
                        <strong>Discound: {promotion.rate}%</strong>
                        <strong>UntilDate: {moment(promotion.date).format("DD-MM-YYYY")}</strong>
                        <strong>Number: {promotion.number}</strong>
                      </div>

                    </div>
                    <div className="flex flex-col justify-end">
                      {/* <Button title="Chose" variant="outlined" disabled={selectedSeats.length === 0}  style={{ flex: 1 }} /> */}
                      <button
                        disabled={selectedSeats.length === 0 || promotion.number <= 0}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: selectedSeats.length === 0 ? "#ccc" : "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
                          fontWeight: "bold",
                          fontSize: "14px",
                          transition: "0.3s",
                        }}
                        onClick={() => setSelectedPromotion(promotion)}
                      >Chose</button>
                      <br />
                      {/* <Button title="Cancel" variant="outlined"  style={{ flex: 1 }} /> */}
                      <button
                        disabled={selectedSeats.length === 0}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: selectedSeats.length === 0 ? "#ccc" : "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
                          fontWeight: "bold",
                          fontSize: "14px",
                          transition: "0.3s",
                        }}
                        onClick={() => { setSelectedPromotion(null); }}
                      >Cancel</button>
                    </div>
                  </div>
                ))}
          </div>
        </Col>


      </Row>
    </div>
  );
}

export default ChoseSeat;
