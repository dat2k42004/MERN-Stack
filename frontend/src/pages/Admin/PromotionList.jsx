import React, { useEffect } from 'react'
import Button from "../../components/Button"
import PromotionForm from './PromotionForm';
import { useState } from "react";
import moment from "moment";
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllPromotions } from '../../apicalls/promotions';

function PromotionsList() {
     const [promotions, setPromotions] = useState([]);
     const [showPromotionFormModal, setShowPromotionFormModal] = useState(false);
     const [selectedPromotion, setSelectedPromotion] = useState(null);
     const [formType, setFormType] = useState("add");



     const dispatch = useDispatch();

     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllPromotions();
               if (response.success) {
                    setPromotions(response.data);
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
               dataIndex: "name",
          },
          {
               title: "Number",
               dataIndex: "number",
          },
          {
               title: "Active",
               dataIndex: "active",
               render: (text, record) => {
                    return record.active ? "Action" : "Stop";
               }
          },
          {
               title: "Date",
               dataIndex: "date",
               render: (text, record) => {
                    return moment(record.date).format("DD-MM-YYYY");
               }
          },
          {
               title: "Rate",
               dataIndex: "rate",
          },
          {
               title: "Action",
               dataIndex: "action",
               render: (text, record) => {
                    return (
                         <div className="flex gap-1">
                              <i class="ri-edit-line" style={{ color: "blue" }}
                                   onClick={() => {
                                        setSelectedPromotion(record);
                                        setFormType("edit");
                                        setShowPromotionFormModal(true);
                                   }}></i>
                              <i class="ri-delete-bin-line" style={{ color: "red" }}
                                   onClick={() => {
                                        setSelectedPromotion(record);
                                        setFormType("delete");
                                        setShowPromotionFormModal(true);
                                   }}
                              ></i>
                         </div>
                    )
               }
          }
     ]

     const [searchText, setSearchText] = useState("");
     // const [filteredPromotions, setFilteredPromotions] = useState([]);
     // const handleSubmit = (e) => {
     //      e.preventDefault();
     //      const filtered = promotions.filter((promotion) =>
     //           promotion.title.toLowerCase().includes(searchText.toLowerCase())
     //      );
     //      setFilteredPromotions(filtered);
     // };


     return (
          <div>
               <div className="flex justify-between items-center mb-4">
                    <form style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                         <input
                              type="text"
                              name="promotionKey"
                              placeholder="Search promotion by title..."
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                              style={{
                                   height: '40px',
                                   padding: '0 12px',
                                   borderRadius: '4px',
                                   border: '1px solid black',
                                   fontSize: '14px',
                                   boxSizing: 'border-box',
                                   minWidth: '250px'
                              }}
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


                    <Button
                         title="Add Promotion"
                         variant="outlined"
                         onClick={() => {
                              setShowPromotionFormModal(true);
                              setFormType("add");
                         }}
                    />
               </div>
               <br />

               <Table
                    columns={columns}
                    dataSource={searchText.length > 0 ? promotions.filter((promotion) =>
                         promotion.name.toLowerCase().includes(searchText.toLowerCase())
                    ) : promotions}
                    rowKey="_id"
               />

               {showPromotionFormModal &&
                    <PromotionForm
                         showPromotionFormModal={showPromotionFormModal}
                         setShowPromotionFormModal={setShowPromotionFormModal}
                         selectedPromotion={selectedPromotion}
                         setSelectedPromotion={setSelectedPromotion}
                         formType={formType}
                         getData={getData}
                    />}
          </div>
     )
}

export default PromotionsList