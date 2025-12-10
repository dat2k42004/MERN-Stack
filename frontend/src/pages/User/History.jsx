import React from 'react';
import { useState, useEffect } from "react";
import { GetBill, DeleteBill, UpdateBill } from '../../apicalls/bill';
import { HideLoading, ShowLoading } from '../../redux/loadersSlide';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { message, Row, Col } from 'antd';
import { useLocation } from "react-router-dom";
import '../../assets/css/History.css';

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
    <div className="history-page">
      <div className="history-header">
        <h1 className="page-title">📋 Lịch sử đặt vé</h1>
      </div>

      {data && data.length > 0 ? (
        <div className="history-list">
          {data.map((d, index) => (
            <div key={d.bill._id} className="history-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <Row gutter={[20, 20]}>
                <Col span={6}>
                  <div className="info-section">
                    <h3 className="info-title">🎬 Thông tin phim</h3>
                    <div className="info-content">
                      <div className="info-item">
                        <span className="info-label">Phim:</span>
                        <span className="info-value">{d.movie.title}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Rạp:</span>
                        <span className="info-value">{d.cinema.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phòng:</span>
                        <span className="info-value">{d.room.name} ({d.room.type})</span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={6}>
                  <div className="info-section">
                    <h3 className="info-title">📅 Lịch chiếu</h3>
                    <div className="info-content">
                      <div className="info-item">
                        <span className="info-label">Ghế:</span>
                        <span className="info-value seats">{d.ticket.map((e) => `${e.seat}`).join(', ')}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Ngày:</span>
                        <span className="info-value">{moment(d.schedule.date).format("DD/MM/YYYY")}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Giờ:</span>
                        <span className="info-value">{d.schedule.startTime}</span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={6}>
                  <div className="info-section">
                    <h3 className="info-title">💰 Chi tiết</h3>
                    <div className="info-content">
                      <div className="info-item">
                        <span className="info-label">Dịch vụ:</span>
                        <span className="info-value">
                          {d.service.length > 0
                            ? d.service.map((e) => `${e.service.type} (×${e.quantity})`).join(', ')
                            : "Không"}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Khuyến mãi:</span>
                        <span className="info-value">
                          {d.promotion ? `Giảm ${d.promotion.rate}%` : "Không"}
                        </span>
                      </div>
                      <div className="info-item total-cost">
                        <span className="info-label">Tổng tiền:</span>
                        <span className="info-value">{d.bill.totalCost.toLocaleString()} VND</span>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col span={6}>
                  <div className="info-section action-section">
                    <h3 className="info-title">⚡ Trạng thái</h3>
                    <div className="action-content">
                      {!d.bill.status ? (
                        <>
                          <div className="status-badge pending">Chờ thanh toán</div>
                          <button
                            className="action-btn payment-btn"
                            onClick={() => {
                              console.log(d.bill);
                              handlePayment(d.bill);
                            }}
                          >
                            <span className="btn-icon">💳</span>
                            Thanh toán
                          </button>
                          <button
                            className="action-btn cancel-btn"
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
                          >
                            <span className="btn-icon">✕</span>
                            Hủy vé
                          </button>
                        </>
                      ) : (
                        <div className="paid-status">
                          <i className="ri-check-double-line success-icon"></i>
                          <div className="status-badge success">Đã thanh toán</div>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-history">
          <div className="no-history-icon">🎫</div>
          <h2>Chưa có lịch sử đặt vé</h2>
          <p>Hãy đặt vé xem phim đầu tiên của bạn!</p>
        </div>
      )}
    </div>
  )
}

export default History