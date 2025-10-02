import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();
axios.defaults.withCredentials =true;

export const AppContextProvider = ({ children }) => {
  const backendUrl =  "https://auth-12-384f.onrender.com";
  console.log("Backend URL:", backendUrl);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch logged-in user data
  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
   
      });

      console.log("Raw user data response:", response);

      const user = response.data?.data;
      if (response.data?.status && user) {
        setUserData(user);  // set only user object
        setIsLoggedin(true);
        console.log("User data fetched:", user);
      } else {
        setUserData(null);
        setIsLoggedin(false);
        toast.error(response.data?.message || "Failed to fetch user data.");
      }
    } catch (err) {
      console.error("Error fetching userData:", err);
      setUserData(null);
      setIsLoggedin(false);
      toast.error("Failed to fetch user data.");
    }
  };

  // Check authentication state on app load
  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
   
      });

      if (response.data?.status) {
        await getUserData();
      }
    } catch (err) {
      console.error("Auth check error:", err);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
