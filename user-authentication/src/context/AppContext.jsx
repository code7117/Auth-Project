import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = "https://auth-project-f3ag.onrender.com";
  console.log("Backend URL:", backendUrl);

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch logged-in user data using token from cookie
  const getUserData = async () => {
    try {
      const token = Cookies.get("token"); // ✅ Get token from cookie
      if (!token) {
        setUserData(null);
        setIsLoggedin(false);
        return;
      }

      const response = await axios.get(`${backendUrl}/api/user/data`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token
        },
      });

      console.log("Raw user data response:", response);

      const user = response.data?.data;
      if (response.data?.status && user) {
        setUserData(user);
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
      const token = Cookies.get("token");
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
