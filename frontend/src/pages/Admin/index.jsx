import React from 'react'
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import CinemasList from './CinemasList';
import UsersList from "./UsersList";
import SchedulesList from "./SchedulesList";
function Admin() {
  return (
    <div >
      <PageTitle title="ADMIN"></PageTitle>

      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Users" key="1" >
          <UsersList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Movies" key="2">
          <MoviesList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cinemas" key="3">
          <CinemasList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Schedules" key="4">
          <SchedulesList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Statistics" key="5">
          Statistics
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Admin