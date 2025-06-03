import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, Table, Row, Col } from 'antd';
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import { GetAllMovies } from "../../apicalls/movies";
import TrailerModal from '../../components/TrailerModel';
import PosterModal from '../../components/PosterModel';
import Button from "../../components/Button";
import MovieDetail from "../../components/MovieDetail";

function Movie({ MoviegoToBooking }) {
     const [movies, setMovies] = useState([]);
     const dispatch = useDispatch();
     const [selectedTrailer, setSelectedTrailer] = useState("");
     const [showPosterModal, setShowPosterModal] = useState(false);
     const [selectedPoster, setSelectedPoster] = useState("");
     const [showTrailerModal, setShowTrailerModal] = useState(false);
     const [showMovieInfoModal, setShowMovieInfoModal] = useState(false);
     const [selectedMovie, setSelectedMovie] = useState(null);
     const [searchText, setSearchText] = useState("");

     const filteredMovies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
     );



     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllMovies();
               if (response.success) {
                    setMovies(response.data.filter((e) => e.active));
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
                    placeholder="Search for movie"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
               />

               <Row
                    gutter={[20, 20]}
                    className="mt-2"
               >
                    {filteredMovies.map((movie) => (
                         <Col span={6} key={movie._id}>
                              <div
                                   className="p-2 card flex flex-col gap-2 cursor-pointer justify-between"
                                   style={{
                                        borderRadius: "4px",
                                        height: "580px", // chỉnh tùy theo thiết kế mong muốn
                                        display: "flex",
                                        flexDirection: "column",
                                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
                                   }}
                              >
                                   <img
                                        src={movie.poster}
                                        alt="Poster"
                                        style={{ width: "100%", height: "400px" }}
                                        onClick={() => {
                                             setSelectedPoster(movie.poster);
                                             setShowPosterModal(true);
                                        }}
                                   />
                                   <div className="flex gap-1 p-1 flex-col">
                                        <h1
                                             className="text-md"
                                             onClick={() => {
                                                  setSelectedMovie(movie);
                                                  setShowMovieInfoModal(true);
                                             }}
                                             style={{fontSize: "25px"}}
                                        >
                                             {movie.title}
                                        </h1>

                                        <div className="flex gap-2">
                                             {/* <Button
                                                  title="Watch Trailer"
                                                  variant="outlined"
                                                  onClick={() => {
                                                       const match = movie.trailer.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
                                                       if (match) {
                                                            setSelectedTrailer(match[1]);
                                                            setShowTrailerModal(true);
                                                       }
                                                  }}
                                                  style={{ flex: 1 }}
                                             />

                                             <Button
                                                  title="Booking"
                                                  variant="outlined"
                                                  onClick={() => MoviegoToBooking(movie)}
                                                  style={{ flex: 1 }}
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
                                                       const match = movie.trailer.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
                                                       if (match) {
                                                            setSelectedTrailer(match[1]);
                                                            setShowTrailerModal(true);
                                                       }
                                                  }}
                                             >Trailer</button>
                                             <br />
                                             <button
                                                  className="hover"
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
                                                  onClick={() => MoviegoToBooking(movie)}
                                             >Book</button>
                                        </div>
                                   </div>

                              </div>


                         </Col>
                    ))}
               </Row>

               {showPosterModal && <PosterModal
                    open={showPosterModal}
                    onClose={() => setShowPosterModal(false)}
                    imageUrl={selectedPoster}
               />}
               {showTrailerModal && <TrailerModal
                    open={showTrailerModal}
                    onClose={() => setShowTrailerModal(false)}
                    videoId={selectedTrailer}
               />}
               {showMovieInfoModal && <MovieDetail
                    showMovieInfoModal={showMovieInfoModal}
                    setShowMovieInfoModal={setShowMovieInfoModal}
                    selectedMovie={selectedMovie}
               />}
          </div>
     )
};

export default Movie;