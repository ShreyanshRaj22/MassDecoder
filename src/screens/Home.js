import React, { useState, useEffect } from "react";
import bannerImg from "../images/banner.jpg";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [containerHeight, setContainerHeight] = useState("90vh"); // Initial container height

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
    height: containerHeight, // Dynamically set container height
    width: "100vw",
    position: "relative", // Allows absolute positioning within
  };

  const boxStyles = {
    position: "absolute", // Absolute position within the flex container
    width: "500px",
    height: "50px",
    backgroundColor: "white",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    zIndex: 2, // Ensures it sits on top of the background image
  };

  const iconStyles = {
    fontSize: "20px",
    color: "#777",
    cursor: "pointer", // Add pointer cursor to indicate it's clickable
  };

  const inputStyles = {
    flex: 1,
    height: "40px",
    border: "none",
    outline: "none",
    fontSize: "18px",
    paddingLeft: "10px",
  };

  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/search?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for artworks:", error);
      // Handle errors
    }
  };

  useEffect(() => {
    // Update container height when search results change
    const newContainerHeight = searchResults.length > 0 ? "auto" : "90vh";
    setContainerHeight(newContainerHeight);
  }, [searchResults]);

  return (
    <div>
      <div style={containerStyles}>
        <img src={bannerImg} alt="Banner" style={imgStyles} />
        <div style={boxStyles}>
          <i
            style={iconStyles}
            className="fa-solid fa-magnifying-glass"
            onClick={handleClick}
          ></i>
          <input
            style={inputStyles}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* Display search results */}
      <div className="container mt-4" style={{ maxWidth: "960px" }}>
        <div className="row">
          {searchResults.map((artwork, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={artwork.image}
                  className="card-img-top"
                  alt={artwork.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{artwork.name}</h5>
                  <p className="card-text">Style: {artwork.style}</p>
                  <p className="card-text">Artist: {artwork.artist}</p>
                  <p className="card-text">Category: {artwork.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
