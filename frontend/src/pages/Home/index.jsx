import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message, Table, Row, Col } from 'antd';
import { HideLoading, ShowLoading } from "../../redux/loadersSlide";
import { GetAllMovies } from "../../apicalls/movies";
import TrailerModal from '../../components/TrailerModel';
import PosterModal from '../../components/PosterModel';
import Button from "../../components/Button";
import MovieDetail from "../../components/MovieDetail";

function Home() {
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
                        <div className="p-2 card flex flex-col gap-1 cursor-pointer" style={{borderRadius: "4px"}}>
                            <img
                                src={movie.poster}
                                alt="Poster"
                                // className="w-16 h-20 object-cover cursor-pointer rounded"
                                style={{ width: "100%", height: 300 }}
                                onClick={() => {
                                    setSelectedPoster(movie.poster);
                                    setShowPosterModal(true);
                                }}
                            />
                            <div className="flex gap-1 p-1">
                                <h1
                                    className="text-md"
                                    onClick={() => {
                                        setSelectedMovie(movie);
                                        setShowMovieInfoModal(true);
                                    }}
                                >
                                    {movie.title}
                                </h1>

                                <Button
                                    title="Watch Trailer"
                                    variant="outlined"
                                    onClick={() => {
                                        setSelectedTrailer(movie.trailer.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/)[1]);
                                        setShowTrailerModal(true);
                                    }}
                                ></Button>
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

export default Home;