import React from 'react';
import './Navbar.css';

const Navbar = ({ onCategoryChange }) => {
  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  return (
    <nav className="navbar">
      <ul className="nav-categories">
        <li onClick={() => handleCategoryChange('business')}>Business</li>
        <li onClick={() => handleCategoryChange('entertainment')}>Entertainment</li>
        <li onClick={() => handleCategoryChange('general')}>General</li>
        <li onClick={() => handleCategoryChange('health')}>Health</li>
        <li onClick={() => handleCategoryChange('science')}>Science</li>
        <li onClick={() => handleCategoryChange('sports')}>Sports</li>
        <li onClick={() => handleCategoryChange('technology')}>Technology</li>
      </ul>

      
    </nav>
  );
};

export default Navbar;
