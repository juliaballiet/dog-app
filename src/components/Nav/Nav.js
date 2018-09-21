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
            Manage Food
          </Link>
        </li>
        <li>
          <Link to="/manage-activities">
            Manage Activities
          </Link>
        </li>
        <li>
          <Link to="/manage-skills">
            Manage Skills
          </Link>
        </li>
        <li>
          <Link to="/new-feeding">
            New Feeding
          </Link>
        </li>
        <li>
          <Link to="/new-exercise">
            New Exercise
          </Link>
        </li>
        <li>
          <Link to="/new-training">
            New Training
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
