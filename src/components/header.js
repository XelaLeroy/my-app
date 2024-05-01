import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faUser } from "@fortawesome/free-regular-svg-icons";

import "./header.css";

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar">
        <div className="toggle">
          <span className="burger_line"></span>
        </div>
        <ul className="d-flex flex-row navbar-nav pt-2">
          <li className="nav-item">
            <FontAwesomeIcon className="icon" icon={faHouse} />
            <Link to="/" className="nav-link text-white">
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            <Link to="/calendrier" className="nav-link text-white">
              Calendrier
            </Link>
          </li>
          <li className="nav-item">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <Link to="/effectif" className="nav-link text-white">
              Effectif
            </Link>
          </li>
          <li className="nav-item">
            <FontAwesomeIcon className="icon" icon={faTicket} />
            <Link to="/contact" className="nav-link text-white">
              Billeterie
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Header;
