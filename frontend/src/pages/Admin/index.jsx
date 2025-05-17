import React from 'react'
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import CinemasList from './CinemasList';
import UsersList from "./UsersList";
import SchedulesList from "./SchedulesList";
import PromotionList from './PromotionList';
import ServiceList from './ServiceList';
import Statistic from './Statistic';
function Admin({user}) {
  return (
    <div >
      {/* <PageTitle title="ADMIN"></PageTitle> */}

      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="👤Users" key="1" >
          <UsersList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="🎬Movies" key="2">
          <MoviesList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="🎥Cinemas" key="3">
          <CinemasList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="📅Schedules" key="4">
          <SchedulesList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="🏷️Promotions" key="5">
          <PromotionList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="🍿Services" key="6">
          <ServiceList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="📊Statistics" key="7">
          <Statistic />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Admin