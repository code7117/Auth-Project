import React, { useContext, useState, useRef } from 'react';
import { assets } from '../../assets/assets';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedin, setUserData } = useContext(AppContext);

  const token = Cookies.get("token"); // ✅ Get token from cookie

  const sendVerifiactionOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/send-verify-otp',
        {},
        { headers: { Authorization: `Bearer ${token}` } } // send token
      );

      if (data.status) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } } // send token
      );

      if (data.status) {
        setIsLoggedin(false);
        setUserData(null);
        Cookies.remove("token"); // ✅ Clear token from cookie
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 300);
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
              {!userData.isAccountVerified && (
                <li onClick={sendVerifiactionOtp}>Verify Email</li>
              )}
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
