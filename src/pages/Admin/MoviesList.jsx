import React, { useEffect } from 'react'
import Button from "../../components/Button"
import MovieForm from './MovieForm';
import { useState } from "react";
import moment from "moment";
import { Table, message } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllMovies } from '../../apicalls/movies';
import TrailerModal from '../../components/TrailerModel';
import PosterModal from '../../components/PosterModel';
import '../../assets/css/AdminList.css';
function MoviesList() {
     const [movies, setMovies] = useState([]);
     const [showMovieFormModal, setShowMovieFormModal] = useState(false);
     const [selectedMovie, setSelectedMovie] = useState(null);
     const [formType, setFormType] = useState("add");
     const [showTrailerModal, setShowTrailerModal] = useState(false);
     const [selectedTrailer, setSelectedTrailer] = useState("");
     const [showPosterModal, setShowPosterModal] = useState(false);
     const [selectedPoster, setSelectedPoster] = useState("");


     const dispatch = useDispatch();

     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllMovies();
               if (response.success) {
                    setMovies(response.data);
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
               dataIndex: "title",
          },
          {
               title: "Description",
               dataIndex: "description",
          },
          {
               title: "Duration",
               dataIndex: "duration",
          },
          {
               title: "Author",
               dataIndex: "author",
          },
          {
               title: "Release Date",
               dataIndex: "releaseDate",
               render: (text, record) => {
                    return moment(record.releaseDate).format("DD-MM-YYYY");
               }
          },
          {
               title: "Genre",
               dataIndex: "genre",
          },
          {
               title: "Poster",
               dataIndex: "poster",
               render: (text, record) => (
                    <div className="flex justify-end">
                         {/* <img
                              src={record.poster}
                              alt="Poster"
                              className="w-16 h-20 object-cover cursor-pointer rounded"
                              width="80"
                              height="55"
                              onClick={() => {
                                   setSelectedPoster(record.poster);
                                   setShowPosterModal(true);
                              }}
                         /> */}
                         <i class="ri-image-fill" onClick={() => {
                              setSelectedPoster(record.poster);
                              setShowPosterModal(true);
                         }}></i>
                         {showPosterModal && <PosterModal
                              open={showPosterModal}
                              onClose={() => setShowPosterModal(false)}
                              imageUrl={selectedPoster}
                         />}
                    </div>

               )
          },
          {
               title: "Trailer",
               dataIndex: "trailer",
               render: (text, record) => {
                    const youtubeUrl = record.trailer;
                    const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
                    const videoId = videoIdMatch ? videoIdMatch[1] : null;

                    if (!videoId) return "Invalid URL";

                    return (
                         <div className="flex justify-end">
                              {/* <Button
                                   title="Watch Trailer"
                                   variant="outlined"
                                   onClick={() => {
                                        setSelectedTrailer(videoId);
                                        setShowTrailerModal(true);
                                   }}
                              ></Button> */}
                              <i class="ri-youtube-fill w-16 h-20" style={{ color: "red" }} onClick={() => {
                                   setSelectedTrailer(videoId);
                                   setShowTrailerModal(true);
                              }}></i>
                              {showTrailerModal && <TrailerModal
                                   open={showTrailerModal}
                                   onClose={() => setShowTrailerModal(false)}
                                   videoId={selectedTrailer}
                              />}
                         </div>
                    );
               }
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
                                        setSelectedMovie(record);
                                        setFormType("edit");
                                        setShowMovieFormModal(true);
                                   }}></i>
                              <i className="ri-delete-bin-line"
                                   onClick={() => {
                                        setSelectedMovie(record);
                                        setFormType("delete");
                                        setShowMovieFormModal(true);
                                   }}
                              ></i>
                         </div>
                    )
               }
          }
     ]

     const [searchText, setSearchText] = useState("");
     // const [filteredMovies, setFilteredMovies] = useState([]);
     // const handleSubmit = (e) => {
     //      e.preventDefault();
     //      const filtered = movies.filter((movie) =>
     //           movie.title.toLowerCase().includes(searchText.toLowerCase())
     //      );
     //      setFilteredMovies(filtered);
     // };


     return (
          <div className="admin-list-container">
               <div className="admin-list-header">
                    <div className="admin-search-container">
                         <input
                              type="text"
                              className="admin-search-input"
                              placeholder="🔍 Tìm kiếm phim theo tên..."
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                         />
                    </div>

                    <button
                         className="admin-add-button"
                         onClick={() => {
                              setShowMovieFormModal(true);
                              setFormType("add");
                         }}
                    >
                         <i className="ri-add-line"></i>
                         Thêm Phim Mới
                    </button>
               </div>

               <Table
                    columns={columns}
                    dataSource={searchText.length === 0 ? movies : movies.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
               />

               {showMovieFormModal &&
                    <MovieForm
                         showMovieFormModal={showMovieFormModal}
                         setShowMovieFormModal={setShowMovieFormModal}
                         selectedMovie={selectedMovie}
                         setSelectedMovie={setSelectedMovie}
                         formType={formType}
                         getData={getData}
                    />}
          </div>
     )
}

export default MoviesList