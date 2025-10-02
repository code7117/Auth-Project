import React, { useContext, useState } from 'react'
import Styles from './ResetPassword.module.css'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [email,setEmail]= useState('')
  const [newPassword,setNewPassword]=useState('')
  const [isEmailSent,setIsEmailSent]=useState('')
  const[otp,setOtp]=useState(0)
  const[isOtpSubmitted,setIsOtpSubmitted]=useState(false)

  const{backendUrl}= useContext(AppContext)
  axios.defaults.withCredentials=true;
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
  const navigate = useNavigate();
  const onSubmitEmail = async(e)=>{
    e.preventDefault();
    try {
      const {data}= await axios.post(backendUrl + '/api/auth/sent-reset-otp',{email})
      data.status ? toast.success(data.message) : toast.error(data.message) 
      data.status && setIsEmailSent(true)
    } catch (err) {
      console.log(err);
      toast.error(err.message)
      
    }

  }
  const onSubmitOtp = async (e)=>{
    e.preventDefault();
    const otpArray  =inputRefs.current.map(e=>e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async(e)=>{
    e.preventDefault();
    try {
      const {data}= await axios.post(backendUrl + '/api/auth/reset-password',{email,otp,newPassword})
      data.status ? toast.success(data.message) : toast.error(data.message)
      data.status && navigate('/login')   
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      
    }
  }
  return (
   <>
     <div className={Styles.container}>
           <img
             onClick={() => navigate("/")}
             src={assets.logo}
             alt="loginlogo"
             className={Styles.logo}
           />
           {/* enter email id */}

           {!isEmailSent  &&        <form onSubmit={onSubmitEmail} className={Styles.form} >
              <h1>Reset password</h1>
                      <p className={Styles.pt}>
                        Enter your registered email address
                      </p>
                      <div className={Styles.subcon}>
                        <img src={assets.mail_icon} alt="" />
                        <input className={Styles.int} type="email" placeholder='Email id' value={email} onChange={e=>setEmail(e.target.value)} required/>
                      </div>
                      <button className={Styles.btn}>Submit</button>

           </form>
           }
    
{/* otp input form */}

{!isOtpSubmitted && isEmailSent &&   <form onSubmit={onSubmitOtp}className={Styles.form}>
                   <h1>Reset password OTP</h1>
                   <p className={Styles.pt}>
                     Enter the 6-digit code send to your email id.
                   </p>
         
                   <div className={Styles.subcon2} onPaste={handlePaste}>
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
                   <button className={Styles.btn}>Submit</button>
                 </form>
}
            
                 
                 {/* enter new password */}
                 {isOtpSubmitted && isEmailSent &&            <form onSubmit={onSubmitNewPassword}className={Styles.form} >
              <h1>New password</h1>
                      <p className={Styles.pt}>
                        Enter the new password below
                      </p>
                      <div className={Styles.subcon}>
                        <img src={assets.lock_icon} alt="" />
                        <input className={Styles.int} type="password" placeholder='Password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} required/>
                      </div>
                      <button className={Styles.btn}>Submit</button>

           </form>
           }
        
           </div>
   
   </>
  )
}

export default ResetPassword