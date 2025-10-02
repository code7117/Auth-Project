import React from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";


const Home = () => {
  return (
<div className={styles.container}>
  <Navbar />
  <Header />
</div>

  );
};

export default Home;
