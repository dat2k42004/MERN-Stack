import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, Table, Row, Col } from 'antd';
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import { GetAllCinemas } from "../../apicalls/cinemas";
import Button from "../../components/Button";
import { Icon } from "../../components/Icon";
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
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search for cinema"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Row
        gutter={[20, 20]}
        className="mt-2"
      >
        {filteredCinemas.map((cinema) => (
          <Col span={6} key={cinema._id}>
            <div className="p-2 card flex flex-col gap-1 cursor-pointer" style={{ borderRadius: "4px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }} onClick={() => CinemaToBooking(cinema)}>
              <img
                src={Icon.find((e) => e.title === cinema.founder)?.image}
                alt="Poster"
                // className="w-16 h-20 object-cover cursor-pointer rounded"
                style={{ width: "100%", height: 400 }}
              />
              <div className="gap-1 p-1">
                <h1
                  className="text-md"

                  style={{ fontSize: "25px" }}
                >
                  {cinema.name}
                </h1>
                <i><h1
                  className="text-md"
                >
                  Address: {cinema.address}
                </h1></i>
                <h1
                  className="text-md"
                >
                  Phone: {cinema.phone}
                </h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
};

export default Cinema;