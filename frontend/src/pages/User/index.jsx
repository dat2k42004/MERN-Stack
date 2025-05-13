  import React, { useState, useEffect } from 'react';
  import { Tabs } from "antd";
  import Movie from './Movie';
  import Cinema from './Cinema';
  import Booking from './Booking';
  import History from './History';

  function User({user}) {
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

    return (
      <div>
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} destroyInactiveTabPane={false}>
          <Tabs.TabPane tab="Movies" key="1" >
            <Movie MoviegoToBooking={MoviegoToBooking} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Cinemas" key="2" >
            <Cinema CinemaToBooking={CinemaToBooking}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Booking" key="3">
            <Booking isActive={activeTab === "3"} movieData={movieData} cinemaData={cinemaData} user={user} BookingToHistory={BookingToHistory}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="History" key="4">
            <History user={user}/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }

  export default User;
