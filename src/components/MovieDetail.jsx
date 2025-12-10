import React from 'react'
import { Modal } from 'antd'
import moment from "moment";

function MovieDetail({ showMovieInfoModal, setShowMovieInfoModal, selectedMovie }) {
     return (
          <Modal
               open={showMovieInfoModal}
               onCancel={() => setShowMovieInfoModal(false)}
               footer={null}
          // title={selectedMovie?.title}
          >
               {selectedMovie && (
                    <div className="flex flex-col gap-1">
                         <h2>{selectedMovie.title}</h2>
                         <img
                              src={selectedMovie.poster}
                              alt="Poster"
                              style={{ width: "100%", height: 300, objectFit: "cover" }}
                         />
                         {/* <p><strong>Author:</strong> {selectedMovie.author}</p>
                         <p><strong>Genre:</strong> {selectedMovie.genre}</p>
                         <p><strong>Duration:</strong> {selectedMovie.duration} second</p>
                         <p><strong>Description:</strong> {selectedMovie.description}</p> */}
                         <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="font-semibold text-gray-700"><strong>Author:</strong> {selectedMovie.author}</div>

                              <div className="font-semibold text-gray-700"><strong>Release Date:</strong> {moment(selectedMovie.releaseDate).format("DD-MM-YYYY")}</div>

                              <div className="font-semibold text-gray-700"><strong>Genre:</strong> {selectedMovie.genre}</div>

                              <div className="font-semibold text-gray-700"><strong>Duration:</strong> {selectedMovie.duration} munites</div>

                              <div className="font-semibold text-gray-700"><strong>Description:</strong> {selectedMovie.description}</div>
                         </div>
                    </div>
               )}
          </Modal>
     )
}

export default MovieDetail