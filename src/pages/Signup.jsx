import React, {useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import M from "materialize-css";
import "../styles/auth-screen.css"

export default function Signup() {
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  });
   const navigate = useNavigate();

  function uploadFields(){
    const {name,email,password} =user;
    const options = {
      headers: {'Content-Type': 'application/json'}
    };
    axios.post("/signup",{name,email,password},options) 
    .then(res=>{
      console.log(res.data.message); 
      M.toast({html: res.data.message, classes:"#1de9b6 teal accent-3"})
      if(res.data.success){
        navigate("/signin");
      }
    })
    .catch(err=>{
      if (err.response) {
        M.toast({html: err.response.data.error, classes:"#c62828 red darken-3"});
        console.log(err.response.status);
      }
    });
  }

  function handleChange(event){
       const {name,value} = event.target;
       setUser(prevValue=>{
         return {...prevValue,[name]:value};
       });
  }

    return (
        <div className="my-card">
        <div className="card auth-card input-field">
          <h2>Buy Car</h2>
          <input onChange={handleChange} value={user.name} name="name" type="text" placeholder="name"/>
          <input onChange={handleChange} value={user.email} name="email" type="email" placeholder="email"/>
          <input onChange={handleChange} value={user.password} name="password" type="password" placeholder="password"/>
          <button onClick={uploadFields} className="btn waves-effect waves-light black darken-3">Sign Up</button>
          <h5><Link to="/signin">Already have an account ?</Link></h5>
    </div>
  </div>
    )
}
