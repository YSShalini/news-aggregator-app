import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link
import './Homepage.css';

const Homepage = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState(null); // State for weather data
    const [categories] = useState(['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology']);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [selectedSource, setSelectedSource] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const sources = [
        { name: 'BBC News', code: 'bbc-news' },
        { name: 'CNN', code: 'cnn' },
        { name: 'Fox News', code: 'fox-news' },
        { name: 'Al Jazeera', code: 'al-jazeera-english' },
        { name: 'Reuters', code: 'reuters' },
        { name: 'HuffPost', code: 'the-huffington-post' },
    ];

    // Fetch Weather Data
    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Perundurai&appid=e808d9d40286f30c1886ab8c2d67a9d4&units=metric`);
            setWeather(response.data);
        } catch (err) {
            console.error(`Error fetching weather: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                let url;
                if (searchQuery.trim()) {
                    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=en&sortBy=publishedAt&apiKey=865ddffae2e24b718e573163a244a932&pageSize=15`;
                } else if (selectedSource) {
                    url = `https://newsapi.org/v2/top-headlines?sources=${selectedSource}&language=en&apiKey=865ddffae2e24b718e573163a244a932&pageSize=15`;
                } else {
                    url = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=865ddffae2e24b718e573163a244a932&pageSize=15`;
                }

                const response = await axios.get(url);
                setNews(response.data.articles);
            } catch (err) {
                if (err.response && err.response.status === 429) {
                    setError("You have exceeded the number of allowed requests. Please try again later.");
                } else {
                    setError(`An error occurred while fetching news: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        const debounceFetchNews = setTimeout(fetchNews, 1000);
        return () => clearTimeout(debounceFetchNews);
    }, [selectedCategory, selectedSource, searchQuery]);

    const handleSourceChange = (e) => {
        setSelectedSource(e.target.value);
        setSearchQuery('');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSelectedSource('');
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
    };

    const handleProfileOptionClick = (option) => {
        console.log(`Clicked on ${option}`);
        setIsProfileDropdownOpen(false);
    };

    return (
        <div className="homepage-container">
            <button onClick={toggleDarkMode} className="toggle-dark-mode">
                {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
            <h1 className="header">NewsSphere</h1>

            {/* Profile Dropdown with User Icon */}
            <div className="profile-dropdown">
                <span 
                    onClick={toggleProfileDropdown}
                    style={{ cursor: 'pointer', fontSize: '40px' }} // Adjust size as needed
                >
                    <FontAwesomeIcon icon={faUserCircle} />
                </span>
                {isProfileDropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={() => handleProfileOptionClick("View Profile")}>View Profile</button>
                        <button onClick={() => handleProfileOptionClick("Settings")}>Settings</button>
                        <button onClick={() => handleProfileOptionClick("Logout")}>Logout</button>
                    </div>
                )}
            </div>

            {/* Weather Section */}
            <div className="weather-section">
                {weather ? (
                    <div>
                        <h2>Weather in {weather.name}</h2>
                        <p>Temperature: {weather.main.temp}°C</p>
                        <p>Weather: {weather.weather[0].description}</p>
                    </div>
                ) : (
                    <p>Loading weather...</p>
                )}
            </div>

            {/* Category Navbar */}
            <nav className="navbar">
                {categories.map((category, index) => (
                    <button 
                        key={index} 
                        className={`nav-link ${selectedCategory === category ? 'active' : ''}`} 
                        onClick={() => {
                            setSelectedCategory(category);
                            setSelectedSource('');
                            setSearchQuery('');
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </nav>

            {/* Search Form */}
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search latest news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/* News Source Dropdown */}
            <div className="source-dropdown-container">
                <select value={selectedSource} onChange={handleSourceChange} className="source-dropdown">
                    <option value="">Select News Source</option>
                    {sources.map((source) => (
                        <option key={source.code} value={source.code}>
                            {source.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="news-grid">
    {loading && <p className="loading">Loading news...</p>}
    {error && <p className="error">{error}</p>}
    {!loading && !error && news.length > 0 ? (
        news.map((article, index) => (
            <article key={index} className="news-article">
                {article.urlToImage ? (
                    <img src={article.urlToImage} alt={article.title} className="article-image" />
                ) : null} {/* Hide the image entirely if not available */}
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
            </article>
        ))
    ) : (
        !loading && <p>No news articles found.</p>
    )}
</div>

        </div>
    );
};

export default Homepage;
