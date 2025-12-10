import React, { useEffect } from 'react'
import Button from "../../components/Button"
import ServiceForm from './ServiceForm';
import { useState } from "react";
// import moment from "moment";
import { Table, message } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllServices } from '../../apicalls/services';
import '../../assets/css/AdminList.css';

function ServicesList() {
     const [services, setServices] = useState([]);
     const [showServiceFormModal, setShowServiceFormModal] = useState(false);
     const [selectedService, setSelectedService] = useState(null);
     const [formType, setFormType] = useState("add");



     const dispatch = useDispatch();

     const getData = async () => {
          try {
               dispatch(ShowLoading());
               const response = await GetAllServices();
               if (response.success) {
                    setServices(response.data);
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
               title: "Type",
               dataIndex: "type",
          },
          {
               title: "Price",
               dataIndex: "price",
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
                                        setSelectedService(record);
                                        setFormType("edit");
                                        setShowServiceFormModal(true);
                                   }}></i>
                              <i className="ri-delete-bin-line"
                                   onClick={() => {
                                        setSelectedService(record);
                                        setFormType("delete");
                                        setShowServiceFormModal(true);
                                   }}
                              ></i>
                         </div>
                    )
               }
          }
     ]

     const [searchText, setSearchText] = useState("");
     // const [filteredServices, setFilteredServices] = useState([]);
     // const handleSubmit = (e) => {
     //      e.preventDefault();
     //      const filtered = services.filter((service) =>
     //           service.title.toLowerCase().includes(searchText.toLowerCase())
     //      );
     //      setFilteredServices(filtered);
     // };


     return (
          <div className="admin-list-container">
               <div className="admin-list-header">
                    <div className="admin-search-container">
                         <input
                              type="text"
                              className="admin-search-input"
                              placeholder="🔍 Tìm kiếm dịch vụ..."
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                         />
                    </div>

                    <button
                         className="admin-add-button"
                         onClick={() => {
                              setShowServiceFormModal(true);
                              setFormType("add");
                         }}
                    >
                         <i className="ri-add-line"></i>
                         Thêm Dịch Vụ
                    </button>
               </div>

               <Table
                    columns={columns}
                    dataSource={searchText.length > 0 ? services.filter((service) =>
                         service.type.toLowerCase().includes(searchText.toLowerCase())
                    ) : services}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
               />

               {showServiceFormModal &&
                    <ServiceForm
                         showServiceFormModal={showServiceFormModal}
                         setShowServiceFormModal={setShowServiceFormModal}
                         selectedService={selectedService}
                         setSelectedService={setSelectedService}
                         formType={formType}
                         getData={getData}
                    />}
          </div>
     )
}

export default ServicesList