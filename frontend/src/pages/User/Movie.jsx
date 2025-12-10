import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, Table, Row, Col } from 'antd';
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import { GetAllMovies } from "../../apicalls/movies";
import TrailerModal from '../../components/TrailerModel';
import PosterModal from '../../components/PosterModel';
import Button from "../../components/Button";
import MovieDetail from "../../components/MovieDetail";
import '../../assets/css/Movie.css';

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
          <div className="movie-page">
               <div className="search-container">
                    <input
                         type="text"
                         className="movie-search-input"
                         placeholder="🔍 Tìm kiếm phim..."
                         value={searchText}
                         onChange={(e) => setSearchText(e.target.value)}
                    />
               </div>

               <Row
                    gutter={[24, 24]}
                    className="mt-2 movie-grid"
               >
                    {filteredMovies.map((movie) => (
                         <Col span={6} key={movie._id}>
                              <div className="movie-card">
                                   <div className="movie-poster-wrapper">
                                        <img
                                             src={movie.poster}
                                             alt={movie.title}
                                             className="movie-poster"
                                             onClick={() => {
                                                  setSelectedMovie(movie);
                                                  setShowMovieInfoModal(true);
                                             }}
                                        />
                                        <div className="movie-overlay">
                                             <div className="overlay-content">
                                                  <h3 className="overlay-title">{movie.title}</h3>
                                                  <p className="overlay-text">Nhấn để xem chi tiết</p>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="movie-info">
                                        <h2
                                             className="movie-title"
                                             onClick={() => {
                                                  setSelectedMovie(movie);
                                                  setShowMovieInfoModal(true);
                                             }}
                                        >
                                             {movie.title}
                                        </h2>

                                        <div className="movie-buttons">
                                             <button
                                                  className="movie-btn trailer-btn"
                                                  onClick={() => {
                                                       const match = movie.trailer.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
                                                       if (match) {
                                                            setSelectedTrailer(match[1]);
                                                            setShowTrailerModal(true);
                                                       }
                                                  }}
                                             >
                                                  <span className="btn-icon">▶</span>
                                                  Trailer
                                             </button>

                                             <button
                                                  className="movie-btn book-btn"
                                                  onClick={() => { setSearchText(""); MoviegoToBooking(movie) }}
                                             >
                                                  <span className="btn-icon">🎫</span>
                                                  Đặt vé
                                             </button>
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