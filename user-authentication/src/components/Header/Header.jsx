import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import styles from "./Header.module.css";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  const [name, setName] = useState("Developer");

useEffect(() => {
  if (userData && userData.name) {
    console.log("Header userData updated:", userData);
    setName(userData.name);
  } else {
    setName("Developer"); // reset on logout
  }
}, [userData]);


  return (
    <div className={styles.container}>
      <img src={assets.header_img} alt="App mascot" className={styles.profileImg} />
      <h1 className={styles.title}>
        Hey {name} <img className={styles.hand} src={assets.hand_wave} alt="wave" />
      </h1>
      <h2 className={styles.subtitle}>Welcome to our app</h2>
      <p className={styles.text}>
        Let's start with a quick product tour and we will have you up and running in no time!
      </p>
      <button className={styles.button}>Get Started</button>
    </div>
  );
};

export default Header;
