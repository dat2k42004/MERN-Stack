import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import { GetAllCinemas } from '../../apicalls/cinemas';
import { GetAllMovies } from '../../apicalls/movies';
import { GetAllRooms } from '../../apicalls/rooms';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { message, Table } from 'antd';
import { GetAllSchedules } from '../../apicalls/schedules';
import ScheduleForm from './ScheduleForm';
import moment from 'moment';
import '../../assets/css/AdminList.css';

function SchedulesList() {
     const [movies, setMovies] = useState([]);
     const [cinemas, setCinemas] = useState([]);
     const [rooms, setRooms] = useState([]);
     const [search, setSearch] = useState({ movie: "", cinema: "", date: "", room: "" });
     const [keyMovie, setKeyMovie] = useState(null);
     const [keyCinema, setKeyCinema] = useState(null);
     const [keyDate, setKeyDate] = useState(null);
     const [keyRoom, setKeyRoom] = useState(null);

     const [schedules, setSchedules] = useState([]);
     const [showScheduleFormModal, setShowScheduleFormModal] = useState(false);
     const [selectedSchedule, setSelectedSchedule] = useState(null);
     const [formType, setFormType] = useState("add");
     const dispatch = useDispatch();

     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const res1 = await GetAllMovies();
               const res2 = await GetAllCinemas();
               const res3 = await GetAllRooms();

               if (res1.success) {
                    setMovies(res1.data.filter((e) => e.active));
               } else {
                    message.error(res1.message)
               }
               if (res2.success) {
                    setCinemas(res2.data.filter((e) => e.active));
               } else {
                    message.error(res2.message)
               }
               if (res3.success) {
                    setRooms(res3.data.filter((e) => e.active));
               } else {
                    message.error(res3.message)
               }

               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
     }
     const getSchedule = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllSchedules();
               if (response.success) {
                    setSchedules(response.data);
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
          getSchedule();
     }, []);


     const columns = [
          {
               title: "Movie",
               dataIndex: "movie_id",
               render: (text, record) => {
                    return movies.find(e => e._id === record.movie_id)?.title;
               }
          },
          {
               title: "Cinema",
               dataIndex: "cinema_id",
               render: (text, record) => {
                    return cinemas.find(e => e._id === record.cinema_id)?.name;
               }
          },
          {
               title: "Room",
               dataIndex: "room_id",
               render: (text, record) => {
                    return rooms.find(e => e._id === record.room_id)?.name;
               }
          },
          {
               title: "Date",
               dateIndex: "date",
               render: (text, record) => {
                    return moment(record.date).format("DD-MM-YYYY");
               }
          },
          {
               title: "StartTime",
               dataIndex: "startTime",
               // render: (text, record) => {
               //      return moment(record.startTime).format("HH:mm");
               // }
          },
          {
               title: "Price",
               dataIndex: "price",
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
                                        setSelectedSchedule(record);
                                        setFormType("edit");
                                        setShowScheduleFormModal(true);
                                   }}></i>
                              <i className="ri-delete-bin-line"
                                   onClick={() => {
                                        setSelectedSchedule(record);
                                        setFormType("delete");
                                        setShowScheduleFormModal(true);
                                   }}
                              ></i>
                         </div>
                    )
               }
          }
     ]
     // const handleSubmit = (e) => {
     //      e.preventDefault();
     //      const formattedDate = keyDate ? moment(keyDate).format("YYYY-MM-DD") : "";

     //      const filtered = schedules.filter((e) => {
     //           const matchMovie = keyMovie ? e.movie_id === keyMovie : true;
     //           const matchCinema = keyCinema ? e.cinema_id === keyCinema : true;
     //           const matchRoom = keyRoom ? e.room_id === keyRoom : true;
     //           const matchDate = keyDate ? moment(e.date).format("YYYY-MM-DD") === formattedDate : true;

     //           return matchMovie && matchCinema && matchRoom && matchDate;
     //      });

     //      setSearch({ movie: keyMovie, cinema: keyCinema, room: keyRoom, date: formattedDate });
     //      setSchedules(filtered);
     // }

     return (
          <div className="admin-list-container">
               <div className="admin-list-header">
                    <div className="admin-search-container">
                         <select
                              value={keyMovie}
                              onChange={(e) => setKeyMovie(e.target.value)}
                              className="admin-search-input"
                         >
                              <option value="">🎬 Chọn Phim</option>
                              {movies && movies.map((e) => (
                                   <option key={e._id} value={e._id}>{e.title}</option>
                              ))}
                         </select>
                         <select
                              value={keyCinema}
                              onChange={(e) => setKeyCinema(e.target.value)}
                              className="admin-search-input"
                         >
                              <option value="">🏪 Chọn Rạp</option>
                              {cinemas && cinemas.map((e) => (
                                   <option key={e._id} value={e._id}>{e.name}</option>
                              ))}
                         </select>
                         <select
                              value={keyRoom}
                              onChange={(e) => setKeyRoom(e.target.value)}
                              className="admin-search-input"
                         >
                              <option value="">📺 Chọn Phòng</option>
                              {keyCinema && rooms.filter((e) => e.cinema_id === keyCinema).map((e) => (
                                   <option key={e._id} value={e._id}>{e.name}</option>
                              ))}
                         </select>
                         <input
                              type="date"
                              value={keyDate}
                              onChange={(e) => setKeyDate(e.target.value)}
                              className="admin-search-input"
                         />
                    </div>

                    <button
                         className="admin-add-button"
                         onClick={() => {
                              setShowScheduleFormModal(true)
                              setFormType("add");
                         }}
                    >
                         <i className="ri-add-line"></i>
                         Thêm Lịch Chiếu
                    </button>
               </div>

               <Table
                    columns={columns}
                    dataSource={schedules.filter((e) => {
                         const matchMovie = keyMovie ? e.movie_id === keyMovie : true;
                         const matchCinema = keyCinema ? e.cinema_id === keyCinema : true;
                         const matchRoom = keyRoom ? e.room_id === keyRoom : true;
                         const matchDate = keyDate ? moment(e.date).format("YYYY-MM-DD") === (keyDate ? moment(keyDate).format("YYYY-MM-DD") : "") : true;

                         return matchMovie && matchCinema && matchRoom && matchDate;
                    })}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
               />

               {showScheduleFormModal && <ScheduleForm
                    showScheduleFormModal={showScheduleFormModal}
                    setShowScheduleFormModal={setShowScheduleFormModal}
                    selectedSchedule={selectedSchedule}
                    setSelectedSchedule={setSelectedSchedule}
                    movies={movies}
                    cinemas={cinemas}
                    rooms={rooms}
                    getSchedule={getSchedule}
                    formType={formType}
               />}
          </div>
     )
}

export default SchedulesList