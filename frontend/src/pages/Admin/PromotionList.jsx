import React, { useEffect } from 'react'
import Button from "../../components/Button"
import PromotionForm from './PromotionForm';
import { useState } from "react";
import moment from "moment";
import { Table, message } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllPromotions } from '../../apicalls/promotions';
import '../../assets/css/AdminList.css';

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
                    return (
                         <span className={`status-badge ${record.active ? 'active' : 'inactive'}`}>
                              {record.active ? "Active" : "Inactive"}
                         </span>
                    );
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
                         <div className="admin-action-icons">
                              <i className="ri-edit-line"
                                   onClick={() => {
                                        setSelectedPromotion(record);
                                        setFormType("edit");
                                        setShowPromotionFormModal(true);
                                   }}></i>
                              <i className="ri-delete-bin-line"
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
          <div className="admin-list-container">
               <div className="admin-list-header">
                    <div className="admin-search-container">
                         <input
                              type="text"
                              className="admin-search-input"
                              placeholder="🔍 Tìm kiếm khuyến mãi..."
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                         />
                    </div>

                    <button
                         className="admin-add-button"
                         onClick={() => {
                              setShowPromotionFormModal(true);
                              setFormType("add");
                         }}
                    >
                         <i className="ri-add-line"></i>
                         Thêm Khuyến Mãi
                    </button>
               </div>

               <Table
                    columns={columns}
                    dataSource={searchText.length > 0 ? promotions.filter((promotion) =>
                         promotion.name.toLowerCase().includes(searchText.toLowerCase())
                    ) : promotions}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
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