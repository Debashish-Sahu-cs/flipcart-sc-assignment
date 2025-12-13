import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [message,setMessage] = useState("");
  const [inputFocused , setInputFocused] = useState(false);
  const navigateTo = useNavigate();
  const[userDetails, setUserDetails] = useState({ username: '' , password : ''});
  
  function inputLogin(event){
    const {name , value} = event.target;
    setUserDetails((prev) => ({...prev,[name]:value}));
  }
    async function registerUser() {
      try{
      const response = await fetch("http://localhost:5000/api/auth/login",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          username : userDetails.username,
          password : userDetails.password
        })
      });
      const data = await response.json();
      if( response.status === 200 ){
        localStorage.setItem("loginToken", JSON.stringify(data.token));
        navigateTo("/home");
      }else{
          setInputFocused(true) ;
          setMessage("credentials doesn't matched with any user!");
      }
      
    }catch(error){
      console.log(error);
    }
    }
  return (
    <div className="py-4 px-2">
      <div className="py-4 my-4  rounded">
        { inputFocused ? <p className="text-danger text-center"> {message} </p> : <p></p> } 
        <div className="container-fluid  inner-login d-flex flex-column justify-content-center gap-4 w-50 border border-white-50 p-4 rounded bg-light">
          <input type="text" className="form-control border-0  border-bottom border-info " value={userDetails.username} placeholder="your user name" name="username" onChange={(event) => inputLogin(event)} onClick={() => setInputFocused(false)} />
          <input type="password" className="form-control border-0  border-bottom border-info " value={userDetails.password} placeholder="your password" name="password" onChange={(event) => inputLogin(event)} />
          <input type="submit" value="Login" className="btn btn-primary text-uppercase " onClick={() => registerUser()} />
        </div>
        <p className="text-secondary text-center">Don't have an account? <Link to={"/"} className="text-primary" >register</Link></p>
        
      </div>
    </div>
  )
  
}
