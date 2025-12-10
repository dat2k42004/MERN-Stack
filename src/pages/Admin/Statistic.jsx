import React from 'react';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from "../../redux/loadersSlide";
import { useState, useEffect } from "react";
import { message, Table } from 'antd';
import moment from "moment";
import { GetAllBill } from '../../apicalls/bill';
import BillDetail from '../../components/BillDetail';
import { DeleteBill } from '../../apicalls/bill';

function Statistic() {
     const dispatch = useDispatch();
     const [data, setData] = useState([]);
     // const [bill, setBill] = useState();
     // const [filterData, setFilterData] = useState();
     const [selectedBill, setSelectedBill] = useState();
     const [detailForm, setDetailForm] = useState(false);
     const [date, setDate] = useState({ start: "", end: "" });
     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllBill();
               if (response.success) {
                    setData(response.data);
                    console.log(data);
                    // message.success(response.message);
               }
               else {
                    message.error(response.message);
               }
               dispatch(HideLoading());
          } catch (error) {
               dispatch(HideLoading());
               return message.error(roor.message);
          }
     }

     useEffect(() => {
          getData();
     }, []);


     const handleDelete = async (payload) => {
          console.log(payload);
          try {
               dispatch(ShowLoading());
               const response = await DeleteBill({
                    bill: payload.bill,
                    ticket: payload.ticket,
                    service: payload.service,
                    promotion: payload.promotion,
               }
               );
               if (response.success) {
                    message.success(response.message);
                    getData();
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

     const columns = [
          {
               title: "User",
               dataIndex: "user",
               render: (user) => user?.username || "N/A"
          },
          {
               title: "Movie",
               dataIndex: "movie",
               render: (movie) => movie?.title || "N/A"
          },
          {
               title: "Cinema",
               dataIndex: "cinema",
               render: (cinema) => cinema?.name || "N/A"
          },
          {
               title: "Date",
               dataIndex: "schedule",
               render: (schedule) => moment(schedule?.date).format("DD-MM-YYYY") || "N/A"
          },
          {
               title: "Start Time",
               dataIndex: "schedule",
               render: (schedule) => schedule?.startTime || "N/A"
          },
          {
               title: "Total Cost",
               dataIndex: "bill",
               render: (bill) => bill?.totalCost || "0"
          },
          {
               title: "Status",
               dataIndex: "bill",
               render: (bill) => bill?.status ? (<i className="ri-check-double-line" style={{ color: "green" }}></i>) : (<i className="ri-close-large-line" style={{ color: "red" }}></i>)
          },
          {
               title: "Action",
               dataIndex: "action",
               render: (text, record) => (
                    <div className="flex gap-1">
                         <i
                              className="ri-list-unordered"
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => {
                                   setSelectedBill(record)
                                   console.log(record);
                                   setDetailForm(true);
                              }}
                         />
                         {!record.bill.status && (
                              <i className="ri-delete-bin-line" style={{ color: "red", cursor: "pointer" }}
                                   onClick={() => {
                                        handleDelete(record);
                                   }}
                              />
                         )}
                         {/* <i className="ri-close-circle-line"  style={{ color: "red", cursor: "pointer" }}></i> */}
                    </div>
               )
          }
     ];

     // const handleSubmit = (e) => {
     //      e.preventDefault();
     //      const start = date.start && moment(date.start).format("YYYY-MM-DD");
     //      const end = date.end && moment(date.end).format("YYYY-MM-DD");
     //      if (start.localeCompare(end) > 0) {
     //           message.error("Please chose end date greater than start date!");
     //           return 0;
     //      }
     //      const filter = data.filter((e) => {
     //           const day = moment(e.schedule.date).format("YYYY-MM-DD");
     //           return end.localeCompare(day) >= 0 && day.localeCompare(start) >= 0;
     //      });
     //      setFilterData(filter);
     // }
     return (
          <div>
               <>
                    <div className="flex justify-between items-center mb-4">
                         <form style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <input type="date" style={{
                                   height: '40px',
                                   padding: '0 12px',
                                   borderRadius: '4px',
                                   border: '1px solid black',
                                   fontSize: '14px',
                                   boxSizing: 'border-box',
                                   minWidth: '250px'
                              }}
                                   onChange={(e) => setDate({ ...date, start: e.target.value })}
                              />
                              <input type="date" style={{
                                   height: '40px',
                                   padding: '0 12px',
                                   borderRadius: '4px',
                                   border: '1px solid black',
                                   fontSize: '14px',
                                   boxSizing: 'border-box',
                                   minWidth: '250px'
                              }}
                                   onChange={(e) => setDate({ ...date, end: e.target.value })}
                              />

                              {/* <button
                                        type="submit"
                                        style={{
                                             height: '40px',
                                             padding: '0 16px',
                                             backgroundColor: 'white',
                                             color: 'black',
                                             border: '1px solid black',
                                             borderRadius: '4px',
                                             cursor: 'pointer',
                                             fontSize: '14px',
                                             boxSizing: 'border-box'
                                        }}
                                   >
                                        Search
                                   </button> */}
                         </form>

                         <h2>Total Revenue: {date.end && date.start ? (
                              data.filter((e) => {
                                   const day = moment(e.schedule.date).format("YYYY-MM-DD");
                                   const start = date.start && moment(date.start).format("YYYY-MM-DD");
                                   const end = date.end && moment(date.end).format("YYYY-MM-DD");
                                   return end.localeCompare(day) >= 0 && day.localeCompare(start) >= 0 && e.bill.status;
                              }).reduce((acc, curr) => acc + curr.bill.totalCost, 0)
                         ) : data.filter((e) => e.bill?.status).reduce((acc, cur) => acc + cur.bill?.totalCost, 0)} VND</h2>

                    </div>
                    <br />
                    <Table
                         columns={columns}
                         dataSource={date.end && date.start ? data.filter((e) => {
                              const day = moment(e.schedule.date).format("YYYY-MM-DD");
                              const start = date.start && moment(date.start).format("YYYY-MM-DD");
                              const end = date.end && moment(date.end).format("YYYY-MM-DD");
                              return end.localeCompare(day) >= 0 && day.localeCompare(start) >= 0;
                         }) : data}
                         rowKey={(record) => record._id}
                    >

                    </Table>
               </>

               {/* <div className="flex flex-col card gap-2">
                    {data & data.map((e) => {
                         e.bill._id;
                    })}
               </div> */}

               {
                    detailForm && <BillDetail
                         selectedBill={selectedBill}
                         setSelectedBill={selectedBill}
                         detailForm={detailForm}
                         setDetailForm={setDetailForm}
                    />
               }
          </div>
     )
}

export default Statistic