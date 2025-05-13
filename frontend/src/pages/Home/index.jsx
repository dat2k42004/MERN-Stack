import React from 'react'
import AdminHome from './AdminHome';
import UserHome from './UserHome';
function Home({ user }) {
    return (
        user.isAdmin ? (<AdminHome user={user}/>) : (<UserHome user={user}/>)
    )
}

export default Home