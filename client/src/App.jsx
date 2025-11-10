import React from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import {BrowserRouter, Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  
   
    </>
  );
};

export default App;
