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
import '../../assets/css/ChoseSeat.css';
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
        setServices(response.data.filter((e) => e.active)); // Bạn vẫn cần set state services để hiển thị tên dịch vụ
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
        setPromotions(response.data.filter((e) => e.date.localeCompare(moment(new Date()).format("YYYY-MM-DD")) >= 0 && e.active));
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
    if (!user) {
      message.error("Please login to book ticket");
      return;
    }
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
    <div className="chose-seat-page">
      <button
        className="back-btn"
        onClick={() => {
          setShowChoseSeat(false);
          setSelectedSchedule(null);
        }}
      >
        <span className="btn-icon">←</span>
        Quay lại
      </button>
      <div className="cost-summary">
        <div className="total-cost">
          <span className="cost-label">💰 Tổng thanh toán:</span>
          <span className="cost-value">
            {
              (selectedSeats.length * (tickets[0]?.price || 0) + selectedService.reduce((cur, arr) => cur + arr.price * arr.quantity, 0)) * (selectedPromotion ? (100 - selectedPromotion.rate) : 100) / 100
            } VND
          </span>
        </div>
        <button
          disabled={selectedSeats.length === 0}
          className={`booking-btn ${selectedSeats.length === 0 ? 'disabled' : ''}`}
          onClick={(e) => {
            handleBooking(e);
          }}
        >
          <span className="btn-icon">🎫</span>
          ĐẶT VÉ
        </button>
      </div>


      <Row gutter={[20, 20]} className="mt-2">

        <Col span={12}>
          <div className="seat-section">
            <h2 className="section-title">🪑 Chọn ghế ngồi</h2>

            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat-demo selected"></div>
                <span>Đã chọn</span>
              </div>
              <div className="legend-item">
                <div className="seat-demo booked"></div>
                <span>Đã đặt</span>
              </div>
              <div className="legend-item">
                <div className="seat-demo available"></div>
                <span>Còn trống</span>
              </div>
            </div>


            <div className="screen-indicator">MÀN HÌNH</div>

            <div className="seat-grid">
              {tickets.map((ticket) => (
                <button
                  key={ticket._id}
                  onClick={() => handleSeatToggle(ticket._id)}
                  disabled={ticket.status === true}
                  className={`seat-btn ${ticket.status
                    ? "booked"
                    : selectedSeats.includes(ticket._id)
                      ? "selected"
                      : "available"
                    }`}
                >
                  {ticket.seat}
                </button>
              ))}
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className="service-section">
            <h2 className="section-title">🍿 Dịch vụ</h2>
            <div className="service-list">
              {services && services.map((e) => (
                <div key={e._id} className="service-item">
                  <div className="service-info">
                    <div className="service-name">{e.type}</div>
                    <div className="service-price">{e.price} VND</div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    disabled={selectedSeats.length === 0}
                    className={`quantity-input ${selectedSeats.length === 0 ? 'disabled' : ''}`}
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
              ))}
            </div>
          </div>
        </Col>

        <Col span={6}>
          <div className="promotion-section">
            <h2 className="section-title">🎁 Khuyến mãi</h2>
            <div className="promotion-list">
              {promotions &&
                promotions.map((promotion) => (
                  <div
                    key={promotion._id}
                    className={`promotion-card ${selectedPromotion?._id === promotion._id ? 'selected' : ''}`}
                  >
                    <div className="promotion-info">
                      <div className="promotion-name">{promotion.name}</div>
                      <div className="promotion-details">
                        <div className="detail-row">
                          <span className="detail-icon">🏷️</span>
                          <span>Giảm: {promotion.rate}%</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">📅</span>
                          <span>HSD: {moment(promotion.date).format("DD/MM/YYYY")}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-icon">🎟️</span>
                          <span>Còn: {promotion.number}</span>
                        </div>
                      </div>
                    </div>
                    <div className="promotion-actions">
                      <button
                        disabled={selectedSeats.length === 0 || promotion.number <= 0}
                        className={`action-btn choose-promo-btn ${selectedSeats.length === 0 || promotion.number <= 0 ? 'disabled' : ''}`}
                        onClick={() => setSelectedPromotion(promotion)}
                      >
                        <span className="btn-icon">✓</span>
                        Chọn
                      </button>
                      <button
                        disabled={selectedSeats.length === 0}
                        className={`action-btn cancel-promo-btn ${selectedSeats.length === 0 ? 'disabled' : ''}`}
                        onClick={() => { setSelectedPromotion(null); }}
                      >
                        <span className="btn-icon">✕</span>
                        Hủy
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Col>


      </Row>
    </div>
  );
}

export default ChoseSeat;
