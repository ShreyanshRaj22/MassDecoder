import React, { useState, useEffect } from "react";
import bannerImg from "../images/banner.jpg";
import searchIcon from "../images/upload-icon.png"; // Import the new search icon

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [containerHeight, setContainerHeight] = useState("90vh"); // Initial container height
  const [showUploadOverlay, setShowUploadOverlay] = useState(false); // State to control upload overlay visibility

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
    zIndex: 2,
    justifyContent: "space-between",
  };

  const iconStyles = {
    height: "30px",
    width: "30px",
    cursor: "pointer",
  };

  const inputStyles = {
    height: "40px",
    border: "none",
    outline: "none",
    fontSize: "18px",
    paddingLeft: "10px",
    flex: 1, // Fill remaining space in the flex container
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
    }
  };

  // Function to toggle upload overlay visibility
  const toggleUploadOverlay = () => {
    setShowUploadOverlay(!showUploadOverlay);
  };

  useEffect(() => {
    // Fetch random artworks when the component mounts
    const fetchRandomArtworks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/artwork?limit=9`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching random artworks:", error);
        // Handle errors
      }
    };

    fetchRandomArtworks();
  }, []); // Empty dependency array to ensure this effect runs only once, when the component mounts

  useEffect(() => {
    // Update container height when search results change
    const newContainerHeight = searchResults.length > 0 ? "auto" : "90vh";
    setContainerHeight(newContainerHeight);
  }, [searchResults]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData(e.target);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      console.log(data); // Log response from server
      // Reset search query
      setSearchQuery("");
      // Close the upload overlay
      toggleUploadOverlay();
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle errors
    }
  };

  return (
    <div>
      <div style={containerStyles}>
        <img src={bannerImg} alt="Banner" style={imgStyles} />
        <div style={boxStyles}>
          <div>
            <img
              src={searchIcon}
              alt="Search"
              style={iconStyles}
              onClick={toggleUploadOverlay}
            />{" "}
            {/* New icon */}
          </div>z   
          <input
            style={inputStyles}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i
            style={iconStyles}
            className="fa-solid fa-magnifying-glass"
            onClick={handleClick}
          ></i>
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
      {/* Upload overlay */}
      {showUploadOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
          }}
          onClick={toggleUploadOverlay} // Close overlay when clicked outside
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // Box shadow for depth
            }}
            onClick={(e) => e.stopPropagation()} // Prevent click events from bubbling up
          >
            {/* Upload form */}
            <h2>Upload Artwork</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Style:
                <input type="text" name="style" required />
              </label>
              <br />
              <label>
                Artist:
                <input type="text" name="artist" required />
              </label>
              <br />
              <label>
                Category:
                <input type="text" name="category" required />
              </label>
              <br />
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <br />
              <label>
                Image:
                <input type="file" name="image" required />
              </label>
              <br />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
