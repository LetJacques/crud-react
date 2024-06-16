import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../assets/menu-icon.png";
import logo from "../assets/logo.svg";
import logoIcon from "../assets/icon-logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`navbar d-flex align-items-center pt-5 ${
        mobileMenu ? "mobile-menu-active" : ""
      }`}
    >
      <div className="d-flex align-items-center blog-title">
        <Link to={`/`} className="d-flex align-items-center">
          <img
            className="icon"
            src={isMobile ? logoIcon : logo}
            alt="Tech Blog Icon"
          />
        </Link>
        <img
          src={menuIcon}
          className="menu-icon ps-4"
          onClick={toggleMenu}
          alt="Menu Icon"
        />
      </div>
      <ul
        className={`fs-5 fw-semibold d-flex align-items-center flex-grow-1 gap-5 m-0 px-5 ms-5 position-relative ${
          mobileMenu ? "show-mobile-menu" : "hide-mobile-menu"
        }`}
      >
        <li className="nav-item">
          <Link
            to={`/`}
            className="nav-link position-relative nav-link-ltr"
            onClick={() => setMobileMenu(false)}
          >
            Início
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={`/new`}
            className="nav-link position-relative nav-link-ltr"
            onClick={() => setMobileMenu(false)}
          >
            Novo post
          </Link>
        </li>
        <li className="nav-item ms-auto">
          <Link
            to={`/admin`}
            className="nav-link position-relative nav-link-ltr"
            onClick={() => setMobileMenu(false)}
          >
            Gerenciar
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
