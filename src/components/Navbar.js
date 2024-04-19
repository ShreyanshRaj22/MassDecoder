import React from 'react';

const Navbar = () => {
    const navbarStyle = {
        backgroundColor: '#fff', // Transparent black
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        color: 'black',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        outline: 'none',
    };

    return (
        <div style={navbarStyle}>
            <button style={buttonStyle}>Button 1</button>
            <button style={buttonStyle}>Button 2</button>
        </div>
    );
}

export default Navbar;
