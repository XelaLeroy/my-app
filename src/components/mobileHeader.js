import React, { Fragment, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import './mobileHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';



const HeaderMobile = () => {
    const [menuActive, setMenuActive] = useState(false);

    const toggle = () => {
        const menu = document.querySelector('.mobileMenu');
        menu.classList.toggle('active');
        setMenuActive(!menuActive); // 
    }

return (

    <Fragment>
        <nav className="mobileNav">
            <button className={`toggle-button ${menuActive ? 'active' : ''}`} onClick={(toggle)}><FontAwesomeIcon icon={faBars} size="xl" style={{color: "#FFffff"}} /></button>
            <div className="mobileMenu">
                <ul>
                    <li><Link to="/stats" className='nav_link'>Stats</Link></li>
                    <li><Link to="/classement" className='nav_link'>Classement</Link></li>
                    <li><Link to="/news" className='nav_link'>A la Une</Link></li>
                    <li><Link to="/boutique" className='nav_link'>Boutique</Link></li>
                </ul>
            </div>
        </nav>


    </Fragment>
)

}


export default HeaderMobile;