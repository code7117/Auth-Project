import React, { useContext, useEffect } from "react";
import Styles from "./EmailVerify.module.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-Account",
        { otp }
      );
      if (data.status) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      }else{
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  };
  const navigate = useNavigate();
  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin,userData])

  return (
    <>
      <div className={Styles.container}>
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="loginlogo"
          className={Styles.logo}
        />

        <form onSubmit={onSubmitHandler} className={Styles.form}>
          <h1>Email Verify OTP</h1>
          <p className={Styles.pt}>
            Enter the 6-digit code send to your email id.
          </p>

          <div className={Styles.subcon} onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  className={Styles.in}
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className={Styles.btn}>Verify email</button>
        </form>
      </div>
    </>
  );
};

export default EmailVerify;
