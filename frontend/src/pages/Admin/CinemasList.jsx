import React, { useEffect } from 'react'
import Button from "../../components/Button"
import CinemaForm from './CinemaForm';
import { useState } from "react";
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllCinemas } from '../../apicalls/cinemas';
import RoomsList from './RoomsList';

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
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            <i class="ri-edit-line" style={{ color: "blue" }}
              onClick={() => {
                setSelectedCinema(record);
                setFormType("edit");
                setShowCinemaFormModal(true);
              }}></i>
            <i class="ri-delete-bin-line" style={{ color: "red" }}
              onClick={() => {
                setSelectedCinema(record);
                setFormType("delete");
                setShowCinemaFormModal(true);
              }}
            ></i>
            <i class="ri-building-line"
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
        <div>

          <div className="flex justify-between items-center mb-4">
            <form style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                name="movieKey"
                placeholder="Search cinema by name..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: '4px',
                  border: '1px solid black',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  minWidth: '250px'
                }}
              />
              {/* <button
                type="submit"
                style={{
                  height: '40px',
                  padding: '0 16px',
                  backgroundColor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                Search
              </button> */}
            </form>


            <Button
              title="Add Cinema"
              variant="outlined"
              onClick={() => {
                setShowCinemaFormModal(true);
                setFormType("add");
              }}
            />
          </div>
          <br />
          <Table
            columns={columns}
            dataSource={searchText.length > 0 ? cinemas.filter((cinema) => cinema.name.toLowerCase().includes(searchText.toLowerCase())) : cinemas}
            rowKey="_id"
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