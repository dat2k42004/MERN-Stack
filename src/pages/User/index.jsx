import React, { useState, useEffect } from 'react';
import { Tabs } from "antd";
import Movie from './Movie';
import Cinema from './Cinema';
import Booking from './Booking';
import History from './History';

function User({ user }) {
  const [activeTab, setActiveTab] = useState("1");
  const [movieData, setMovieData] = useState(null);
  const [cinemaData, setCinemaData] = useState(null);

  // Hàm Movie sẽ gọi
  const MoviegoToBooking = (data) => {
    setMovieData(data);
    setActiveTab("3");
  };

  const CinemaToBooking = (data) => {
    setCinemaData(data);
    setActiveTab("3");
  }

  const BookingToHistory = () => {
    setActiveTab("4");
  }

  useEffect(() => {
    if (activeTab !== "3") {
      setMovieData(null);
      setCinemaData(null);
    }
  }, [activeTab]);

  const containerStyle = {
    padding: '0',
    margin: '0',
  };

  const tabsStyle = {
    '--ant-color-primary': '#006666',
    '--ant-color-primary-hover': '#009999',
  };

  // Custom CSS injection for Ant Design Tabs
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
        .ant-tabs-tab {
          font-size: 18px !important;
          font-weight: 600 !important;
          padding: 12px 24px !important;
          border-radius: 12px 12px 0 0 !important;
          transition: all 0.3s ease !important;
          background: rgba(0, 102, 102, 0.05) !important;
          margin-right: 8px !important;
        }
        
        .ant-tabs-tab:hover {
          background: rgba(0, 102, 102, 0.1) !important;
          transform: translateY(-2px) !important;
        }
        
        .ant-tabs-tab-active {
          background: linear-gradient(135deg, #006666 0%, #009999 100%) !important;
          box-shadow: 0 4px 15px rgba(0, 102, 102, 0.3) !important;
        }
        
        .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2) !important;
        }
        
        .ant-tabs-tab-btn {
          color: #006666 !important;
          font-weight: 600 !important;
        }
        
        .ant-tabs-ink-bar {
          background: linear-gradient(90deg, #006666 0%, #009999 100%) !important;
          height: 4px !important;
          border-radius: 2px !important;
        }
        
        .ant-tabs-nav {
          margin-bottom: 0 !important;
          background: white !important;
          padding: 10px 20px 0 20px !important;
          border-radius: 12px 12px 0 0 !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
        
        .ant-tabs-content-holder {
          background: transparent !important;
        }
        
        .ant-tabs-tabpane {
          padding: 0 !important;
        }
      `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        destroyInactiveTabPane={false}
        style={tabsStyle}
        animated={{ inkBar: true, tabPane: true }}
      >
        <Tabs.TabPane tab="🎬 Movies" key="1" >
          <Movie MoviegoToBooking={MoviegoToBooking} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="🎭 Cinemas" key="2" >
          <Cinema CinemaToBooking={CinemaToBooking} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="🎫 Booking" key="3">
          <Booking isActive={activeTab === "3"} movieData={movieData} cinemaData={cinemaData} user={user} BookingToHistory={BookingToHistory} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="📋 History" key="4">
          <History user={user} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default User;
