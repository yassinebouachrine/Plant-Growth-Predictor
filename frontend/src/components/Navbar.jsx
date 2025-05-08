// src/components/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">🌿</div>
      <nav>
        <a className="active" href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Model</a>
        <a href="#">Contact</a>
      </nav>
      <div className="page-btn">Predict</div>
    </div>
  );
};

export default Navbar;