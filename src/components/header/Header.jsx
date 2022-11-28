import React, { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";

// ! Images
import logo from "../../assets/tmovie.png";

// ! CSS File
import "./header.scss";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <>
      <div className="header" ref={headerRef}>
        <div className="header__wrap container">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to="/">LMovies</Link>
          </div>
          <ul className="header__nav">
            {headerNav.map((element, index) => (
              <li key={index} className={`${index === active ? "active" : ""}`}>
                <Link to={element.path}>{element.display}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
