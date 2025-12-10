import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, Table, Row, Col } from 'antd';
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import { GetAllCinemas } from "../../apicalls/cinemas";
import Button from "../../components/Button";
import { Icon } from "../../components/Icon";
import '../../assets/css/Cinema.css';
// import CinemaDetail from "../../components/CinemaDetail";


// const icon = [
//   {
//     title: "CGV",
//     image: "https://gigamall.vn/data/2019/05/06/11365490_logo-cgv-500x500.jpg"
//   },
//   {
//     title: "Beta",
//     image: "https://www.betacinemas.vn/assets/common/img/logo/big_logo.jpg",
//   },
//   {
//     title: "BHD",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7B_nBpVvS9s8H2b-cMhRRPXVorMLQBa4rTql35UVkenMm57qBvnvtyLAcPjpNUdOaKgw&usqp=CAU"
//   },
//   {
//     title: "Lotte",
//     image: "https://images.urbox.vn/_img_server/2023/06/07/1686129043_64804993c94ac.png"
//   },
//   {
//     title: "Galaxy",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsArXYM0_omsyUc-DTIxe3xZq8scF2XbDYiw&s"
//   },
//   {
//     title: "Cinestar",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_G2csGPSein6_xMQ0LRVFZB32lfRDmD4Pw&s"
//   }, 
//   {
//     title: "Mega GS",
//     image: "https://yt3.googleusercontent.com/ytc/AIdro_kAogUzys6HT78bL9_vITcF9xNdzolVER0Rb-D8s1kxmQ=s900-c-k-c0x00ffffff-no-rj"
//   }, 
//   {
//     title: "Dcine",
//     image: "https://play-lh.googleusercontent.com/13niUTsOUjEP_9SYPLyjznAA67ckOp0VvqJBQSZvLaEv_024VxWXyU7vEIOuWsMFBBo",
//   }
// ]
function Cinema({ CinemaToBooking }) {
  const [cinemas, setCinemas] = useState([]);
  const dispatch = useDispatch();
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [searchText, setSearchText] = useState("");

  const filteredCinemas = cinemas.filter((cinema) =>
    cinema.name.toLowerCase().includes(searchText.toLowerCase())
  );



  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllCinemas();
      if (response.success) {
        setCinemas(response.data.filter((e) => e.active));
      }
      else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="cinema-page">
      <div className="search-container">
        <input
          type="text"
          className="cinema-search-input"
          placeholder="🔍 Tìm kiếm rạp chiếu..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Row
        gutter={[24, 24]}
        className="mt-2 cinema-grid"
      >
        {filteredCinemas.map((cinema) => (
          <Col span={6} key={cinema._id}>
            <div className="cinema-card" onClick={() => { setSearchText(""); CinemaToBooking(cinema) }}>
              <div className="cinema-logo-wrapper">
                <img
                  src={Icon.find((e) => e.title === cinema.founder)?.image}
                  alt={cinema.name}
                  className="cinema-logo"
                />
                <div className="cinema-overlay">
                  <div className="overlay-content">
                    <h3 className="overlay-title">{cinema.name}</h3>
                    <p className="overlay-text">Nhấn để xem lịch chiếu</p>
                  </div>
                </div>
              </div>

              <div className="cinema-info">
                <h2 className="cinema-name">
                  {cinema.name}
                </h2>
                <div className="cinema-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{cinema.address}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📞</span>
                    <span className="detail-text">{cinema.phone}</span>
                  </div>
                </div>
                <button className="cinema-btn view-schedule-btn">
                  <span className="btn-icon">🎬</span>
                  Xem lịch chiếu
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
};

export default Cinema;