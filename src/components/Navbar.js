import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onCategoryChange, onSourceChange }) => {
  const [selectedSource, setSelectedSource] = useState('');

  const sources = [
    { name: 'BBC News', code: 'bbc-news' },
    { name: 'CNN', code: 'cnn' },
    { name: 'Fox News', code: 'fox-news' },
    { name: 'Al Jazeera', code: 'al-jazeera-english' },
    { name: 'Reuters', code: 'reuters' },
    { name: 'HuffPost', code: 'the-huffington-post' },
  ];

  const handleSourceChange = (e) => {
    const sourceCode = e.target.value;
    setSelectedSource(sourceCode);
    onSourceChange(sourceCode);
  };

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    setSelectedSource(''); // Reset source selection when category changes
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

      <div className="nav-actions">
        <select value={selectedSource} onChange={handleSourceChange} className="source-dropdown">
          <option value="">Select News Source</option>
          {sources.map((source) => (
            <option key={source.code} value={source.code}>
              {source.name}
            </option>
          ))}
        </select>
        <button className="signin-btn">Sign In</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
