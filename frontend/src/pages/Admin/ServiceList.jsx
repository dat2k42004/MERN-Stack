import React, { useEffect } from 'react'
import Button from "../../components/Button"
import ServiceForm from './ServiceForm';
import { useState } from "react";
// import moment from "moment";
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlide';
import { GetAllServices } from '../../apicalls/services';

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
                    return record.active ? "Action" : "Stop";
               }
          },
          {
               title: "Action",
               dataIndex: "action",
               render: (text, record) => {
                    return (
                         <div className="flex gap-1">
                              <i class="ri-edit-line" style={{ color: "blue" }}
                                   onClick={() => {
                                        setSelectedService(record);
                                        setFormType("edit");
                                        setShowServiceFormModal(true);
                                   }}></i>
                              <i class="ri-delete-bin-line" style={{ color: "red" }}
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
          <div>
               <div className="flex justify-between items-center mb-4">
                    <form  style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                         <input
                              type="text"
                              name="serviceKey"
                              placeholder="Search service by title..."
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
                         <br />
                    </form>


                    <Button
                         title="Add Service"
                         variant="outlined"
                         onClick={() => {
                              setShowServiceFormModal(true);
                              setFormType("add");
                         }}
                    />
               </div>
               <br />

               <Table
                    columns={columns}
                    dataSource={searchText.length > 0 ? services.filter((service) =>
                         service.type.toLowerCase().includes(searchText.toLowerCase())
                    ) : services}
                    rowKey="_id"
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