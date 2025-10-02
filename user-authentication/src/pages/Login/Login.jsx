import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
import Styles from "./Login.module.css";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        },{ withCredentials: true });
        console.log("Register Response:", data);

        if (data.status) {
          setIsLoggedin(true);
          await getUserData();
          toast.success("Account created successfully!");
          navigate("/"); // instant navigation
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        },{ withCredentials: true });
        console.log("Login Response:", data);

        if (data.status) {
          setIsLoggedin(true);
          await getUserData();
          toast.success("Login successful!");
          navigate("/"); // instant navigation
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={Styles.container}>
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="loginlogo"
        className={Styles.logo}
      />
      <div className={Styles.subcontainer}>
        <h2 className={Styles.h2}>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className={Styles.p}>
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className={Styles.formcontainer}>
              <img src={assets.person_icon} alt="personlogo" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={Styles.input}
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className={Styles.formcontainer}>
            <img src={assets.mail_icon} alt="emaillogo" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={Styles.input}
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className={Styles.formcontainer}>
            <img src={assets.lock_icon} alt="locklogo" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={Styles.input}
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className={Styles.forgot}
          >
            Forgot password?
          </p>
          <button className={Styles.btn}>{state}</button>
        </form>

        {state === "Sign Up" ? (
          <p className={Styles.al}>
            Already have an account?{" "}
            <span onClick={() => setState("Login")} className={Styles.sp}>
              Login here
            </span>
          </p>
        ) : (
          <p className={Styles.al}>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")} className={Styles.sp}>
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
