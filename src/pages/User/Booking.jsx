import React, { useEffect, useState } from 'react';
import { message, Row, Col } from 'antd';
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import { GetAllMovies } from "../../apicalls/movies";
import { GetAllCinemas } from "../../apicalls/cinemas";
import { useDispatch } from "react-redux";
import { Icon } from '../../components/Icon';
import { GetAllSchedules } from '../../apicalls/schedules';
import { GetAllRooms } from '../../apicalls/rooms';
import moment from 'moment';
import Button from "../../components/Button";
import ChoseSeat from './ChoseSeat';
import '../../assets/css/Booking.css';

function Booking({ isActive, movieData, cinemaData, user, BookingToHistory }) {
     const [allSchedules, setAllSchedules] = useState([]);
     const [filteredSchedules, setFilteredSchedules] = useState([]);
     const [movies, setMovies] = useState(null);
     const [cinemas, setCinemas] = useState(null);
     const [search, setSearch] = useState({ movie: "", cinema: "", date: "" });
     const [selectedMovie, setSelectedMovie] = useState(null);
     const [selectedCinema, setSelectedCinema] = useState(null);
     const [selectedSchedule, setSelectedSchedule] = useState(null);
     const [rooms, setRooms] = useState([]);
     const dispatch = useDispatch();
     const [showChoseSeat, setShowChoseSeat] = useState(false);
     useEffect(() => {
          if (isActive) {
               setSelectedMovie(movieData || null);
               setSelectedCinema(cinemaData || null);
               setSearch({
                    movie: movieData?.title || "",
                    cinema: cinemaData?.name || "",
                    date: "",
               });
               setFilteredSchedules([]);
          } else {
               setSelectedMovie(null);
               setSelectedCinema(null);
               setSearch({ movie: "", cinema: "", date: "" });
               setFilteredSchedules([]);
          }
     }, [isActive, movieData, cinemaData]);

     const getSchedule = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllSchedules();
               if (response.success) {
                    setAllSchedules(response.data.filter((e) => (e.date + " " + e.startTime).localeCompare(moment(new Date()).format("YYYY-MM-DD HH:mm")) >= 0 && e.active));
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
     };

     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const [cinemasResponse, moviesResponse, roomsResponse] = await Promise.all([
                    GetAllCinemas(),
                    GetAllMovies(),
                    GetAllRooms(),
               ]);

               if (cinemasResponse.success) {
                    setCinemas(cinemasResponse.data.filter((e) => e.active));
               } else {
                    message.error(cinemasResponse.message);
               }

               if (moviesResponse.success) {
                    setMovies(moviesResponse.data.filter((e) => e.active));
               } else {
                    message.error(moviesResponse.message);
               }

               if (roomsResponse.success) {
                    setRooms(roomsResponse.data.filter((e) => e.active));
               } else {
                    message.error(roomsResponse.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
     };

     useEffect(() => {
          getData();
          getSchedule();
     }, []);

     const handleMovieSelect = (movie) => {
          setSelectedMovie(movie);
          setSearch({ ...search, movie: movie.title });
          filterSchedules(movie, selectedCinema, search.date);
     };

     const handleCinemaSelect = (cinema) => {
          setSelectedCinema(cinema);
          setSearch({ ...search, cinema: cinema.name });
          filterSchedules(selectedMovie, cinema, search.date);
     };

     const handleDateChange = (e) => {
          const newDate = moment(e.target.value).format("YYYY-MM-DD");
          setSearch({ ...search, date: newDate });
          filterSchedules(selectedMovie, selectedCinema, newDate);
     };

     const filterSchedules = (movie, cinema, date) => {
          const filtered = allSchedules.filter((schedule) => {
               const movieMatch = !movie || movie._id === schedule.movie_id;
               const cinemaMatch = !cinema || cinema._id === schedule.cinema_id;
               const dateMatch = !date || moment(schedule.date).format("YYYY-MM-DD") === date;
               return movieMatch && cinemaMatch && dateMatch;
          });
          setFilteredSchedules(filtered);
     };

     return (
          <div className="booking-page">
               {!showChoseSeat && (
                    <Row gutter={[24, 24]} className="mt-2 booking-grid">
                         <Col span={8}>
                              {/* Movie Box */}
                              <div className="booking-section">
                                   <h2 className="section-title">🎬 Chọn phim</h2>
                                   <input
                                        type="text"
                                        className="booking-search-input"
                                        placeholder="🔍 Tìm kiếm phim..."
                                        value={search.movie}
                                        onChange={(e) => setSearch({ ...search, movie: e.target.value })}
                                   />
                                   {movies &&
                                        movies
                                             .filter((movie) =>
                                                  movie.title.toLowerCase().includes(search.movie.toLowerCase())
                                             )
                                             .map((movie) => (
                                                  <div
                                                       key={movie._id}
                                                       className={`item-card ${selectedMovie?._id === movie._id ? 'selected' : ''}`}
                                                  >
                                                       <div className="item-content">
                                                            <img
                                                                 src={movie.poster}
                                                                 alt={movie.title}
                                                                 className="item-image"
                                                            />
                                                            <div className="item-info">
                                                                 <h3 className="item-title">{movie.title}</h3>
                                                            </div>
                                                       </div>
                                                       <div className="item-actions">
                                                            <button
                                                                 className="action-btn choose-btn"
                                                                 onClick={() => handleMovieSelect(movie)}
                                                            >
                                                                 <span className="btn-icon">✓</span>
                                                                 Chọn
                                                            </button>
                                                            <button
                                                                 className="action-btn cancel-btn"
                                                                 disabled={!selectedMovie}
                                                                 onClick={() => { setSelectedMovie(null); setSearch({ ...search, movie: "" }); filterSchedules(null, selectedCinema, search.date); }}
                                                            >
                                                                 <span className="btn-icon">✕</span>
                                                                 Hủy
                                                            </button>
                                                       </div>
                                                  </div>
                                             ))}
                              </div>
                         </Col>
                         <Col span={8}>
                              {/* Cinema Box */}
                              <div className="booking-section">
                                   <h2 className="section-title">🎭 Chọn rạp</h2>
                                   <input
                                        type="text"
                                        className="booking-search-input"
                                        placeholder="🔍 Tìm kiếm rạp..."
                                        value={search.cinema}
                                        onChange={(e) => setSearch({ ...search, cinema: e.target.value })}
                                   />
                                   {cinemas &&
                                        cinemas
                                             .filter((cinema) =>
                                                  cinema.name.toLowerCase().includes(search.cinema.toLowerCase())
                                             )
                                             .map((cinema) => (
                                                  <div
                                                       key={cinema._id}
                                                       className={`item-card ${selectedCinema?._id === cinema._id ? 'selected' : ''}`}
                                                  >
                                                       <div className="item-content">
                                                            <img
                                                                 src={Icon.find((e) => e.title === cinema.founder)?.image}
                                                                 alt={cinema.name}
                                                                 className="item-image"
                                                            />
                                                            <div className="item-info">
                                                                 <h3 className="item-title">{cinema.name}</h3>
                                                            </div>
                                                       </div>
                                                       <div className="item-actions">
                                                            <button
                                                                 className="action-btn choose-btn"
                                                                 onClick={() => handleCinemaSelect(cinema)}
                                                            >
                                                                 <span className="btn-icon">✓</span>
                                                                 Chọn
                                                            </button>
                                                            <button
                                                                 className="action-btn cancel-btn"
                                                                 disabled={!selectedCinema}
                                                                 onClick={() => { setSelectedCinema(null); setSearch({ ...search, cinema: "" }); filterSchedules(selectedMovie, null, search.date); }}
                                                            >
                                                                 <span className="btn-icon">✕</span>
                                                                 Hủy
                                                            </button>
                                                       </div>
                                                  </div>
                                             ))}
                              </div>
                         </Col>
                         <Col span={8}>
                              {/* Schedule Box */}
                              <div className="booking-section">
                                   <h2 className="section-title">📅 Chọn lịch chiếu</h2>
                                   <input
                                        type="date"
                                        className="booking-search-input"
                                        value={search.date}
                                        onChange={handleDateChange}
                                   />
                                   {filteredSchedules.map((schedule) => {
                                        const room = rooms.filter(r => r._id === schedule.room_id);
                                        return (
                                             <div
                                                  key={schedule._id}
                                                  className="schedule-card"
                                             >
                                                  {room && room.map((e) => (
                                                       <div className="schedule-content" key={e._id}>
                                                            <div className="schedule-info">
                                                                 <div className="schedule-detail">
                                                                      <span className="detail-label">🎬 Phòng:</span>
                                                                      <span className="detail-value">{e.name} ({e.type})</span>
                                                                 </div>
                                                                 <div className="schedule-detail">
                                                                      <span className="detail-label">🎥 Phim:</span>
                                                                      <span className="detail-value">{movies.find(m => m._id === schedule.movie_id)?.title}</span>
                                                                 </div>
                                                                 <div className="schedule-detail">
                                                                      <span className="detail-label">🏢 Rạp:</span>
                                                                      <span className="detail-value">{cinemas.find(c => c._id === schedule.cinema_id)?.name}</span>
                                                                 </div>
                                                                 <div className="schedule-detail">
                                                                      <span className="detail-label">⏰ Giờ:</span>
                                                                      <span className="detail-value">{moment(schedule.startTime, "HH:mm").format("HH:mm")}</span>
                                                                 </div>
                                                                 <div className="schedule-detail">
                                                                      <span className="detail-label">📅 Ngày:</span>
                                                                      <span className="detail-value">{moment(schedule.date).format("DD/MM/YYYY")}</span>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  ))}
                                                  <button
                                                       className="action-btn book-btn"
                                                       onClick={() => {
                                                            setSelectedSchedule(schedule);
                                                            setShowChoseSeat(true);
                                                            console.log("Selected Schedule:", schedule);
                                                       }}
                                                  >
                                                       <span className="btn-icon">🎫</span>
                                                       Đặt vé
                                                  </button>
                                             </div>
                                        );
                                   })}
                                   {filteredSchedules.length === 0 && (
                                        <div className="no-data-message">
                                             <span className="no-data-icon">📭</span>
                                             <p>Không có lịch chiếu phù hợp</p>
                                        </div>
                                   )}
                              </div>
                         </Col>
                    </Row>
               )}


               {showChoseSeat && (
                    <ChoseSeat
                         selectedSchedule={selectedSchedule}
                         showChoseSeat={showChoseSeat}
                         setShowChoseSeat={setShowChoseSeat}
                         setSelectedSchedule={setSelectedSchedule}
                         isActive={isActive}
                         user={user}
                         BookingToHistory={BookingToHistory}
                    />
               )}
          </div>
     );
}

export default Booking;