import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/dash">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/info">
            Info Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
