import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import NewsGrid from '../components/NewsGrid';
import Navbar from '../components/Navbar';
import './LandingPage.css'; // Import your CSS file for styling

const LandingPage = () => {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState('general');
    const [selectedSource, setSelectedSource] = useState('');

    const apiKey = '634bfe066a3e4d15b385fd0c5a4a9b25'; // Your API key

    useEffect(() => {
        fetchNews();
    }, [category, selectedSource]);

    const fetchNews = async () => {
        try {
            let url;
            if (selectedSource) {
                // Fetch news based on the selected source only
                url = `https://newsapi.org/v2/top-headlines?sources=${selectedSource}&apiKey=${apiKey}&pageSize=10`;
            } else {
                // Fetch news based on the category
                url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&pageSize=10`;
            }

            console.log('Fetching URL:', url);
            
            const response = await axios.get(url);
            console.log('Response:', response.data);

            if (response.data.articles) {
                setNews(response.data.articles);
                console.log('Fetched articles:', response.data.articles); // Log the articles
            } else {
                console.error('No articles found:', response.data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSourceChange = (newSource) => {
        console.log('Source changed to:', newSource);
        setSelectedSource(newSource);
    };

    return (
      <div>
        <header className="header">
          <h1>NewsSphere</h1> {/* Header Title */}
        </header>
        <Navbar 
            onCategoryChange={setCategory} 
            onSourceChange={handleSourceChange}
        />
        <div className="buttons">
          <Link to="/signin">
            <button className="auth-button">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="auth-button">Sign Up</button>
          </Link>
        </div>
        <NewsGrid news={news} />
      </div>
    );
  };

export default LandingPage;
