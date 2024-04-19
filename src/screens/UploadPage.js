import React, { useState, useEffect } from "react";
import backgroundImage from "../images/banner2.avif";
import searchIcon from "../images/upload-icon.png";


const UploadPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [containerHeight, setContainerHeight] = useState("90vh");
    const [showUploadOverlay, setShowUploadOverlay] = useState(false);

    const boxStyles = {
        width: "500px",
        height: "50px",
        backgroundColor: "white",
        borderRadius: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 2,
        margin: "0px 0px 0px 40px",
        top: "50%",
        left: "80%",
    };


    const iconStyles = {
        height: "30px",
        width: "30px",
        cursor: "pointer",
    };
    const iconStyles2 = {
        height: "30px",
        width: "30px",
        cursor: "pointer",
        margin: "10px 0px 0px 0px"
    };

    const inputStyles = {
        height: "40px",
        border: "none",
        outline: "none",
        fontSize: "18px",
        paddingLeft: "10px",
        flex: 1,
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


    const toggleUploadOverlay = () => {
        setShowUploadOverlay(!showUploadOverlay);
    };

    useEffect(() => {

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

            }
        };

        fetchRandomArtworks();
    }, []);

    useEffect(() => {

        const newContainerHeight = searchResults.length > 0 ? "auto" : "90vh";
        setContainerHeight(newContainerHeight);
    }, [searchResults]);

    const handleSubmit = async (e) => {
        e.preventDefault();


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
            console.log(data);

            setSearchQuery("");
            toggleUploadOverlay();
        } catch (error) {
            console.error("Error uploading image:", error);

        }
    };
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                justifyContent: 'center',
                padding: '0 2rem',
            }}
        >
            <div style={{ maxWidth: '600px' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white', fontWeight: '600' }}>
                    Showcase your artwork!
                </h1>
                <div style={boxStyles}>
                    <div>
                        <img
                            src={searchIcon}
                            alt="Search"
                            style={iconStyles}
                            onClick={toggleUploadOverlay}
                        />{" "}

                    </div>
                    <input
                        style={inputStyles}
                        type="text"
                        placeholder="Reimagine..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <i
                        style={iconStyles2}
                        className="fa-solid fa-magnifying-glass "
                        onClick={handleClick}
                    ></i>
                </div>
            </div>

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

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showUploadOverlay && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 3,
                    }}
                    onClick={toggleUploadOverlay}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
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

export default UploadPage;