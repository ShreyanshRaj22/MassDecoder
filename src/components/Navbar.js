import React from "react";
import "./navbar.css";
import accounts from "../images/account.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const home = "/";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div>
      <nav className="freenav navbar navbar-expand-lg navbar-light bg-light bg-transparent">
        <div className="container-fluid mx-5 d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-white" to={home}>
            Visual Art Gallery
          </Link>
          <form className="d-flex">
            {localStorage.getItem("authToken") === null ? (
              <Link className="btn fw-bold text-white me-3" to="/login">
                Sign In
              </Link>
            ) : (
              <div className="d-flex align-items-right">
                <button
                  onClick={handleLogout}
                  className="btn fw-bold text-white me-3"
                >
                  Log Out
                </button>
                <Link to="/profile">
                  <img
                    src={accounts}
                    style={{ maxWidth: "30px" }}
                    alt="accounts"
                  />
                </Link>
              </div>
            )}
          </form>
        </div>
      </nav>
    </div>
  );
}
