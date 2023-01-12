import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';
import Home from '../pages/Home';
import BugList from '../pages/BugList';
import FishList from '../pages/FishList';
import FossilList from '../pages/FossilList';

const Sidebar = () => {
  const location = useLocation();
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link
            to="/bugs"
            className={location.pathname === '/bugs' ? 'active' : ''}
          >
            Bugs
          </Link>
          <Link
            to="/fish"
            className={location.pathname === '/fish' ? 'active' : ''}
          >
            Fish
          </Link>
          <Link
            to="/fossils"
            className={location.pathname === '/fossils' ? 'active' : ''}
          >
            Fossils
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
