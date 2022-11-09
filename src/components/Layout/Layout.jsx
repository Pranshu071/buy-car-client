import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import {reducer, initialstate }  from "../../reducers/userReducer";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import CarListing from "../../pages/CarListing";
import CarDetails from "../../pages/CarDetails";
import Contact from "../../pages/Contact";
import Signup from "../../pages/Signup";
import Signin from "../../pages/Signin";

export const userContext = createContext();

const Routers = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(userContext);
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user")); 
    if(user){
      dispatch({type:"USER",payload:user});
    }else{
      if(!window.location.href.startsWith("/reset"))
          navigate("/signin");
    }
  },[]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
    </Routes>
  );
};

const Layout = () => {
  const [state,dispatch] = useReducer(reducer,initialstate);

  return (
    <userContext.Provider value={{state,dispatch}}>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </userContext.Provider>
  );
};

export default Layout;
