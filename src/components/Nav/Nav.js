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
          <Link to="/manage-food">
            Feeding
          </Link>
        </li>
        <li>
          <Link to="/manage-activities">
            Exercise
          </Link>
        </li>
        <li>
          <Link to="/manage-skills">
            Training
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
