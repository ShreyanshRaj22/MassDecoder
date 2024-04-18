import React from "react";
import bannerImg from "../images/banner.jpg";

const Home = () => {
  const imgStyles = {
    width: "100vw",
    height: "90vh",
    objectFit: "cover",
    filter: "blur(2.5px)",
  };
  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  };

  return (
    <>
      <div style={containerStyles}>
        <img src={bannerImg} alt="Banner" style={imgStyles} />
      </div>
    </>
  );
};

export default Home;
