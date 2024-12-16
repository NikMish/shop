import React from 'react';
import { NavLink } from 'react-router-dom';
import GADataLayer from './ga';

function Navigation() {

  const menuClick = (e) => {    
    // GA menu tracking.
    GADataLayer({
      event: 'menu_click',
      menu_item: e.target.text
    });
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" title="Home" onClick={menuClick}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop" title="Gallery" onClick={menuClick}>Shop Gallery</NavLink>
        </li>
        <li>
          <NavLink to="/about" title="About" onClick={menuClick}>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;