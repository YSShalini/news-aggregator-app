import React, { useEffect, useState } from "react";
import axios from "axios";
import './Homepage.css'; // Assuming you have some styles for the homepage

const Homepage = () => {
    const [news, setNews] = useState([]);
    const [language, setLanguage] = useState('en'); // Default language
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            // Assuming user.interest is a string with interests separated by commas
            const interestsString = user?.interest || ""; // Safely accessing interests
            const interestsArray = interestsString.split(',').map(interest => interest.trim()); // Split and trim whitespace

            try {
                const response = await axios.get(`http://localhost:5000/api/news?interests=${interestsArray.join(',')}&language=${language}`);
                console.log('Fetched news:', response.data);
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [language]); // You only need to use language here

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="homepage-container">
            <h2>Latest News</h2>
            <div className="language-dropdown">
                <label htmlFor="language">Choose Language:</label>
                <select id="language" value={language} onChange={handleLanguageChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    {/* Add more languages as needed */}
                </select>
            </div>
            <div className="news-list">
                {news.length > 0 ? (
                    news.map((article, index) => (
                        <div key={index} className="news-article">
                            <h3>{article.title}</h3>
                            <p>{article.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No news available for your interests.</p>
                )}
            </div>
        </div>
    );
};

export default Homepage;
