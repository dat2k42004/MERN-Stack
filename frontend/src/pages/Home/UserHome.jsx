import React from 'react';
import User from "../User/index"
import { useNavigate } from 'react-router-dom';
function UserHome({user}) { 
  return (
    <div>
     <User user={user}/>
    </div>
  )
}

export default UserHome