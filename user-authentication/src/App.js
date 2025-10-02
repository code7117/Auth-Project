import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import EmailVerify from "./pages/Email/EmailVerify";
import ResetPassword from "./pages/resetpassword/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
