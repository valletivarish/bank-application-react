import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const UserDashboard = () => {
    const routeParams = useParams();
    const navigation= useNavigate();
    const goBack=()=>{
        navigation(-1);
    }
  return (
    <div>
      in user dashboard: Route Params : {routeParams.id}; 
      <br/>
      <br/>
      <button onClick={goBack}>go back</button>

    </div>
  )
}

export default UserDashboard
