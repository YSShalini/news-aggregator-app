// LandingPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LandingPage.css";

const LandingPage = () => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default category
  const apiKey = "0051c487f919467380c6af8148b3c825";

  const fetchNews = async (category) => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us`;

    if (category && category !== "all") {
      url += `&category=${category}`; // Append category to the URL
    }

    try {
      const response = await axios.get(url);
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]); // Re-fetch news when the selected category changes

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Set selected category
  };

  return (
    <div className="landing-page">
      <header className="app-header">
        <h1>Newssphere</h1>
      </header>

      <nav className="navbar">
        <ul>
          <li onClick={() => handleCategoryClick("all")}>All</li>
          <li onClick={() => handleCategoryClick("entertainment")}>Entertainment</li>
          <li onClick={() => handleCategoryClick("sports")}>Sports</li>
          <li onClick={() => handleCategoryClick("business")}>Economy</li>
          <li onClick={() => handleCategoryClick("politics")}>Politics</li>
        </ul>
      </nav>

      <div className="news-container">
        {news.map((article) => (
          <div className="news-item" key={article.url}>
            {article.urlToImage && (
              <img
                className="news-image"
                src={article.urlToImage}
                alt={article.title}
              />
            )}
            <h2 className="news-title">{article.title}</h2>
            <p className="news-description">{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
