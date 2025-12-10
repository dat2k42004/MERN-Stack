import React from 'react'
import { Modal, Form, Row, Col, message } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { AddMovie, UpdateMovie, DeleteMovie } from '../../apicalls/movies';
import moment from 'moment';
function MovieForm({
     showMovieFormModal,
     setShowMovieFormModal,
     selectedMovie,
     setSelectedMovie,
     getData,
     formType
}) {
     if (selectedMovie) {
          selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("YYYY-MM-DD");
     }
     const dispatch = useDispatch();
     const onFinish = async (values) => {
          try {
               dispatch(ShowLoading());
               let response = null;

               if (formType === "add") {
                    response = await AddMovie(values);

               } else if (formType === "edit") {
                    response = await UpdateMovie({
                         ...values,
                         _id: selectedMovie._id,
                    })
               } else {
                    response = await DeleteMovie({
                         ...values,
                         _id: selectedMovie._id,
                    })
               }
               if (response.success) {
                    getData();
                    message.success(response.message);
                    setShowMovieFormModal(false);
               } else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               message.error(error.message);
          }
          setSelectedMovie(null);
     };
     return (
          <Modal title={formType === "add" ? "ADD MOVIE" : (formType === "edit" ? "EDIT MOVIE" : "DELETE MOVIE")}
               open={showMovieFormModal}
               onCancel={() => {
                    setShowMovieFormModal(false);
                    setSelectedMovie(null);
               }}
               footer={null}>
               {/* <div>Movie Form</div> */}
               <Form layout='vertical' onFinish={onFinish} initialValues={selectedMovie}>
                    <Row gutter={16}>
                         <Col span={24}>
                              <Form.Item label="Movie Name" name="title">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="Movie Description" name="description">
                                   <textarea type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={8}>
                              <Form.Item label="Movie Duration" name="duration">
                                   <input type="number" min="1" placeholder='1' />
                              </Form.Item>
                         </Col>
                         <Col span={16}>
                              <Form.Item label="Movie Author" name="author">
                                   <input type="text" />
                              </Form.Item>
                         </Col>
                         <Col span={8}>
                              <Form.Item label="Movie Release Date" name="releaseDate">
                                   <input type="date" />
                              </Form.Item>
                         </Col>
                         <Col span={8}>
                              <Form.Item label="Movie Genre" name="genre">
                                   <select name="" id="">
                                        <option value="">Select Genre</option>
                                        <option value="Action">Action</option>
                                        <option value="Comedy">Comedy</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Emotional">Emotional</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Anime">Anime</option>
                                        <option value="History">History</option>
                                        <option value="Science">Science</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Fantasy">Fantasy</option>
                                        <option value="War">War</option>
                                        <option value="Documentary">Documentary</option>
                                        <option value="Superhero">Superhero</option>
                                        <option value="Mythology">Mythology</option>
                                        <option value="Zombie">Zombie</option>
                                        <option value="Family">Family</option>
                                        <option value="Mystery">Mystery</option>
                                        <option value="Romance">Romance</option>
                                   </select>
                              </Form.Item>
                         </Col>
                         <Col span={8}>
                              <Form.Item label="Movie Active" name="active">
                                   <select name="" id="">
                                        <option value="true">Action</option>
                                        <option value="false">Stop</option>
                                   </select>
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="Movie Poster" name="poster">
                                   <input type="url" />
                              </Form.Item>
                         </Col>
                         <Col span={24}>
                              <Form.Item label="Movie Trailer" name="trailer">
                                   <input type="url" />
                              </Form.Item>
                         </Col>
                    </Row>

                    <div className="flex justify-end gap-1">
                         <Button
                              title="CANCEL"
                              type="button"
                              variant="outlined"
                              onClick={() => {
                                   setShowMovieFormModal(false);
                                   setSelectedMovie(null);
                              }}
                         />
                         <Button title={formType !== "delete" ? "SAVE" : "CONFIRM"} type="submit" />
                    </div>
               </Form>
          </Modal>
     )
}

export default MovieForm