import React from 'react';
import { Modal } from "antd";
import moment from "moment";


function BillDetail({ selectedBill, setSelectedBill, setDetailForm, detailForm }) {
     return (
          <div>
               <Modal
                    open={detailForm}
                    onCancel={() => {
                         setDetailForm(false);
                         setSelectedBill(null);
                    }}
                    onOk={() => {
                         setDetailForm(false);
                         setSelectedBill(null);
                    }}
               >
                    <h1>Bill Detail</h1>
                    <hr />
                    <div>
                         <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>User</h2>
                         <strong>User Name: </strong>{selectedBill.user.username}
                         <br />
                         <strong>Email: </strong>{selectedBill.user.email}
                         <br />
                    </div>
                    <hr />
                    <div>
                         <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Movie</h2>
                         <strong>Title: </strong>{selectedBill.movie.title}
                         <br />
                         <strong>Author: </strong>{selectedBill.movie.author}
                         <br />
                         <strong>Duration: </strong>{selectedBill.movie.duration} seconds
                         <br />
                         <strong>Genre: </strong>{selectedBill.movie.genre}
                         <br />
                    </div>
                    <hr />
                    <div>
                         <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Cinema</h2>
                         <strong>Name: </strong>{selectedBill.cinema.name}
                         <br />
                         <strong>Address: </strong>{selectedBill.cinema.address}
                         <br />
                         <strong>Phone: </strong>{selectedBill.cinema.phone}
                         <br />
                    </div>
                    <hr />
                    <div>
                         <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Ticket</h2>
                         <strong>Room: </strong>{selectedBill.room.name} ({selectedBill.room.type})
                         <br />
                         <strong>Seat: </strong>{selectedBill.ticket.map((e) => `[${e.seat}]`)}
                         <br />
                         <strong>Price: </strong>{selectedBill.schedule.price} VND
                         <br />
                    </div>
                    <hr />
                    <div>
                         <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Service</h2>
                         <ul>
                              {!selectedBill.services ? "No" : selectedBill.services.map((e) => (
                                   <li>{e.service.type} ({e.service.price} VND) : {e.quantity}</li>
                              ))}
                         </ul>
                    </div>
                    <hr />
                    <div>
                         <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Promotion</h2>
                         {!selectedBill.promotion ? "No" : (
                              <p><strong>Rate: </strong>{selectedBill.promotion.rate} % </p>
                         )}
                    </div>
                    <hr />
                    <div>
                         <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Total Cost: {selectedBill.bill.totalCost} VND</h2>
                    </div>
               </Modal>
          </div>
     )
}

export default BillDetail