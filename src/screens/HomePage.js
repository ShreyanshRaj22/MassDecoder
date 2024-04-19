import React from "react";
import backgroundImage from "../images/banner.jpg";
import Navbar from "../components/Navbar";


const Homepage = () => {
    // const [searchQuery, setSearchQuery] = useState("");
    // const [searchResults, setSearchResults] = useState([]);
    // const [showUploadOverlay, setShowUploadOverlay] = useState(false);

    // const boxStyles = {
    //     position: "absolute",
    //     width: "500px",
    //     height: "50px",
    //     backgroundColor: "white",
    //     borderRadius: "30px",
    //     display: "flex",
    //     alignItems: "center",
    //     padding: "20px",
    //     zIndex: 2,
    //     justifyContent: "flex-end",
    //     right: "0",
    //     margin: "150px"
    // };

    // const iconStyles = {
    //     height: "30px",
    //     width: "30px",
    //     cursor: "pointer",
    // };

    // const inputStyles = {
    //     height: "40px",
    //     border: "none",
    //     outline: "none",
    //     fontSize: "18px",
    //     paddingLeft: "10px",
    //     flex: 1,
    // };
    // const toggleUploadOverlay = () => {
    //     setShowUploadOverlay(!showUploadOverlay);
    // };
    // const handleClick = async () => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:5000/search?query=${searchQuery}`
    //         );
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         const data = await response.json();
    //         setSearchResults(data);
    //     } catch (error) {
    //         console.error("Error searching for artworks:", error);
    //     }
    // };
    return (
        <>
            <Navbar></Navbar>
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    padding: '0 2rem',
                }}
            >
                <div style={{ maxWidth: '600px' }}>
                    <h1 style={{ fontSize: '5rem', marginBottom: '1rem', color: 'white', fontWeight: '600' }}>
                        Artisan Canvas
                    </h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'white' }}>
                        Unveiling the Boundless Beauty of Artistry! The world is but a canvas to our imagination.
                    </p>
                    <button
                        style={{
                            backgroundColor: '#6b1cff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Adventure is worthwhile. Take a tour »
                    </button>
                </div>

            </div>
        </>
    );
};

export default Homepage;