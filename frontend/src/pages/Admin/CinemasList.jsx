import React, { useEffect } from 'react'
import Button from "../../components/Button"
import CinemaForm from './CinemaForm';
import { useState } from "react";
import { Table, message } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllCinemas } from '../../apicalls/cinemas';
import RoomsList from './RoomsList';
import '../../assets/css/AdminList.css';

function CinemasList() {
  const [cinemas, setCinemas] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showCinemaFormModal, setShowCinemaFormModal] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [formType, setFormType] = useState("add");


  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllCinemas();
      if (response.success) {
        setCinemas(response.data);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Founder",
      dataIndex: "founder",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Star",
      dataIndex: "star",
    },
    {
      title: "Active",
      dataIndex: "active",
      render: (text, record) => {
        return (
          <span className={`status-badge ${record.active ? 'active' : 'inactive'}`}>
            {record.active ? "Active" : "Inactive"}
          </span>
        );
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="admin-action-icons">
            <i className="ri-edit-line"
              onClick={() => {
                setSelectedCinema(record);
                setFormType("edit");
                setShowCinemaFormModal(true);
              }}></i>
            <i className="ri-delete-bin-line"
              onClick={() => {
                setSelectedCinema(record);
                setFormType("delete");
                setShowCinemaFormModal(true);
              }}
            ></i>
            <i className="ri-building-line"
              onClick={() => {
                setSelectedCinema(record);
                setShowRoomModal(true);
              }}
            ></i>

          </div>
        )
      }
    }
  ]
  const [searchText, setSearchText] = useState("");
  // const [filteredCinemas, setFilteredCinemas] = useState([]);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const filtered = cinemas.filter((cinema) =>
  //     cinema.name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setFilteredCinemas(filtered);
  // };
  return (
    <div>
      {!showRoomModal &&
        <div className="admin-list-container">
          <div className="admin-list-header">
            <div className="admin-search-container">
              <input
                type="text"
                className="admin-search-input"
                placeholder="🔍 Tìm kiếm rạp chiếu phim..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <button
              className="admin-add-button"
              onClick={() => {
                setShowCinemaFormModal(true);
                setFormType("add");
              }}
            >
              <i className="ri-add-line"></i>
              Thêm Rạp Mới
            </button>
          </div>

          <Table
            columns={columns}
            dataSource={searchText.length > 0 ? cinemas.filter((cinema) => cinema.name.toLowerCase().includes(searchText.toLowerCase())) : cinemas}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />

          {showCinemaFormModal &&
            <CinemaForm
              showCinemaFormModal={showCinemaFormModal}
              setShowCinemaFormModal={setShowCinemaFormModal}
              selectedCinema={selectedCinema}
              setSelectedCinema={setSelectedCinema}
              formType={formType}
              getData={getData}
            />}
        </div>
      }
      {showRoomModal && <RoomsList
        showRoomModal={showRoomModal}
        setShowRoomModal={setShowRoomModal}
        selectedCinema={selectedCinema}
        setSelectedCinema={setSelectedCinema}
      />}
    </div>
  )
}

export default CinemasList;