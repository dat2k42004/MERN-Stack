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
          <div >
               {!showChoseSeat && (
                    <Row gutter={[20, 20]} className="mt-2">
                         <Col span={8}>
                              {/* Movie Box */}
                              <div className="p-2 card flex flex-col gap-1" style={{ borderRadius: "4px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}>
                                   <h2 className="text-xl">Movie</h2>
                                   <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search for movie"
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
                                                       className={`p-2 cursor-pointer flex items-center gap-4 ${selectedMovie?._id === movie._id ? 'bg-blue-100' : 'bg-white'}`}
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
                                                            <img
                                                                 src={movie.poster}
                                                                 alt="Movie"
                                                                 width="80"
                                                                 height="120"
                                                                 style={{ borderRadius: "4px", padding: "10px" }}
                                                            />
                                                            <div className="flex flex-col">
                                                                 <h3 className="text-lg font-semibold">{movie.title}</h3>
                                                            </div>
                                                       </div>
                                                       <div className="flex flex-col justify-end">
                                                            {/* <Button title="Chose" variant="outlined"  style={{ flex: 1 }} /> */}
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
                                                                 onClick={() => handleMovieSelect(movie)}
                                                            >Chose</button>
                                                            <br />
                                                            <button
                                                                 className="hover"
                                                                 disabled={!selectedMovie}
                                                                 style={{
                                                                      padding: "6px 12px",
                                                                      backgroundColor: "red",
                                                                      color: "white",
                                                                      border: "none",
                                                                      borderRadius: "6px",
                                                                      cursor: "pointer",
                                                                      fontWeight: "bold",
                                                                      fontSize: "14px",
                                                                      transition: "0.3s",
                                                                 }}
                                                                 onClick={() => { setSelectedMovie(null); setSearch({ ...search, movie: "" }); filterSchedules(null, selectedCinema, search.date); }}
                                                            >Cancel</button>
                                                            {/* <Button title="Cancel" variant="outlined" onClick={() => { setSelectedMovie(null); setSearch({ ...search, movie: "" }); filterSchedules(null, selectedCinema, search.date); }} style={{ flex: 1 }} /> */}
                                                       </div>
                                                  </div>
                                             ))}
                              </div>
                         </Col>
                         <Col span={8}>
                              {/* Cinema Box */}
                              <div className="p-2 card flex flex-col gap-1" style={{ borderRadius: "4px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}>
                                   <h2 className="text-xl">Cinema</h2>
                                   <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search for cinema"
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
                                                       className={`p-2 cursor-pointer flex items-center gap-4 ${selectedCinema?._id === cinema._id ? 'bg-blue-100' : 'bg-white'}`}
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
                                                            <img
                                                                 src={Icon.find((e) => e.title === cinema.founder)?.image}
                                                                 alt="Cinema"
                                                                 width="80"
                                                                 height="120"
                                                                 style={{ borderRadius: "4px", padding: "10px" }}
                                                            />
                                                            <div className="flex flex-col">
                                                                 <h3 className="text-lg font-semibold">{cinema.name}</h3>
                                                            </div>
                                                       </div>
                                                       <div className="flex flex-col justify-end">
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
                                                                 onClick={() => handleCinemaSelect(cinema)}
                                                            >Chose</button>
                                                            <br />
                                                            <button
                                                                 className="hover"
                                                                 disabled={!selectedCinema}
                                                                 style={{
                                                                      padding: "6px 12px",
                                                                      backgroundColor: "red",
                                                                      color: "white",
                                                                      border: "none",
                                                                      borderRadius: "6px",
                                                                      cursor: "pointer",
                                                                      fontWeight: "bold",
                                                                      fontSize: "14px",
                                                                      transition: "0.3s",
                                                                 }}
                                                                 onClick={() => { setSelectedCinema(null); setSearch({ ...search, cinema: "" }); filterSchedules(selectedMovie, null, search.date); }}
                                                            >Cancel</button>
                                                            {/* <Button title="Chose" variant="outlined" onClick={() => handleCinemaSelect(cinema)} style={{ flex: 1 }} />
                                                                 <br />
                                                            <Button title="Cancel" variant="outlined" onClick={() => { setSelectedCinema(null); setSearch({ ...search, cinema: "" }); filterSchedules(selectedMovie, null, search.date); }} style={{ flex: 1 }} /> */}
                                                       </div>
                                                  </div>
                                             ))}
                              </div>
                         </Col>
                         <Col span={8}>
                              {/* Schedule Box */}
                              <div className="p-2 card flex flex-col gap-1" style={{ borderRadius: "4px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)" }}>
                                   <h2 className="text-xl">Schedule</h2>
                                   <input
                                        type="date"
                                        className="search-input"
                                        value={search.date}
                                        onChange={handleDateChange}
                                   />
                                   {filteredSchedules.map((schedule) => {
                                        const room = rooms.filter(r => r._id === schedule.room_id);
                                        return (
                                             <div
                                                  key={schedule._id}
                                                  className="flex gap-1 p-2 items-center"
                                                  style={{
                                                       borderRadius: "8px",
                                                       boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                                                       width: "90%",
                                                       minHeight: "80px",
                                                       marginBottom: "10px",
                                                  }}
                                             >
                                                  {room && room.map((e) => (
                                                       <div
                                                            className="p-2 card flex flex-col gap-1"
                                                            style={{
                                                                 // borderRadius: "4px",
                                                                 // boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                                                                 border: "none",
                                                                 width: "80%"
                                                            }}
                                                       >
                                                            <div>{e.name} ({e.type})</div>
                                                            <div>Movie: {movies.find(m => m._id === schedule.movie_id)?.title}</div>
                                                            <div>Cinema: {cinemas.find(c => c._id === schedule.cinema_id)?.name}</div>
                                                            <div>Start Time: {moment(schedule.startTime, "HH:mm").format("HH:mm")}</div>
                                                            <div>Date: {moment(schedule.date).format("YYYY-MM-DD")}</div>
                                                       </div>
                                                  ))}
                                                  {/* <Button
                                                       title="Book"
                                                       variant="outlined"
                                                       onClick={() => {
                                                            setSelectedSchedule(schedule);
                                                            setShowChoseSeat(true);
                                                            console.log("Selected Schedule:", schedule);
                                                       }}
                                                       style={{ flexShrink: 0 }}
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
                                                            setSelectedSchedule(schedule);
                                                            setShowChoseSeat(true);
                                                            console.log("Selected Schedule:", schedule);
                                                       }}
                                                  >Book</button>
                                             </div>
                                        );
                                   })}
                                   {filteredSchedules.length === 0 && (
                                        <div className="text-center p-2">No schedules available based on your selection.</div>
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