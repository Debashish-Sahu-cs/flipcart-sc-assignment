import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function landing() {
 const[userName, setUserName] = useState("");

  function inputLogin(event){
    setUserName(event.target.value);
  }

  let navigateTo = useNavigate();
  function login(){
    userName.trim() ? navigateTo("/home" , {state : userName} ) : alert("plese enter a user name.") ;
  }
  return (
    <div className="py-4 px-2">
      <div className="py-4 my-4 border-white-50 rounded">
        <div className="container-fluid  inner-login d-flex flex-column justify-content-center gap-4 w-50">
          <input type="text" className="form-control border-0  border-bottom border-info " placeholder="Your user name" onChange={(event) => inputLogin(event)} />
          <input type="submit" value="Login" className="btn btn-primary text-uppercase " onClick={() => login()} />
        </div>
      </div>
    </div>
  )
  
}
