import React, { useContext, useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData,backendUrl, setIsLoggedin,setUserData} = useContext(AppContext);

  const sendVerifiactionOtp = async()=>{
    try {
      axios.defaults.withCredentials=true;
      const{data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if(data.status){
        navigate('/email-verify')
        toast.success(data.message)

      }else{
        toast.error(data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }
  const logout = async()=>{
    try {
      axios.defaults.withCredentials = true
      const {data}=await axios.post(backendUrl + '/api/auth/logout')
      data.status && setIsLoggedin(false)
      data.status && setUserData(false)
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      
    }
  }

  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 300); // 300ms delay
  };

  return (
    <div className={styles.head}>
      <img src={assets.logo} alt="logo" className={styles.logo} />
      {userData ? (
        <div
          className={styles.userInitial}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className={styles.p}>{userData.name[0].toUpperCase()}</p>

          <div
            className={`${styles.hoverdropdown} ${open ? styles.show : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul>
              {!userData.isAccountVerified &&   <li onClick={sendVerifiactionOtp}>Verify Email</li>
              }
            
              <li onClick={logout}>Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button onClick={() => navigate('/login')} className={styles.loginBtn}>
          Login <img src={assets.arrow_icon} alt="arrow-icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
