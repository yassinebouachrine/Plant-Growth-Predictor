// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar">
      <div className="logo">🌿</div>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/model" className={location.pathname === '/model' ? 'active' : ''}>Model</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
      </nav>
      <Link to="/model" className="page-btn">Predict</Link> {/* Now this works as a button-link */}
    </div>
  );
};

export default Navbar;
