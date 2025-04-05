import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../Home.css";
import axios from "axios";
import { FaRobot } from "react-icons/fa";
import { handleLogout } from "./logout";
import { signOut } from "firebase/auth";


const HomePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const [previousResults, setPreviousResults] = useState([]);
  const [tests, setTests] = useState([]);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [articles, setArticles] = useState([]); 

  useEffect(() => {
    const storedResults =
      JSON.parse(localStorage.getItem("previousResults")) || [];
    setPreviousResults(storedResults);

    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  useEffect(() => {
    if (!user) return;

    async function fetchPreviousTests() {
      try {
        const q = query(
          collection(db, "PreviousTests"),
          where("Email_ID", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const testsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTests(testsList);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    }

    fetchPreviousTests();
  }, [user]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  useEffect(() => {
    const fetchHealthNews = async () => {
      try {
        const response = await axios.get("https://gdg-pirates-backend.onrender.com/news");
  
        console.log("Fetched News Response:", response.data);
  
        if (response.data.articles) {
          const filteredArticles = response.data.articles.filter((article) => article.image); // Only keep articles with images
          setArticles(filteredArticles);
          console.log("Filtered Articles:", filteredArticles);
        } else {
          console.error("No valid articles found in response.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
  
    fetchHealthNews();
  }, []);
  
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem("previousResults"); 
      localStorage.removeItem("darkMode");
      navigate("/"); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <h2 className={darkMode ? "dark-mode-text" : ""}>DetectX</h2>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/wellness">Wellness Guide</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
        <div className="nav-icons">
          <div
            className="chatbot-icon"
            onClick={toggleChatbot}
            title="Open Chatbot"
          >
            <FaRobot />
          </div>
          <div className="toggle-container" onClick={toggleDarkMode}>
            <span className="icon">☀</span>
            <div className="toggle-circle"></div>
            <span className="icon">🌙</span>
          </div>
        </div>
      </nav>

      {/* Chatbot Popup */}
      {chatbotOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <span>AI Chatbot</span>
            <button className="close-btn" onClick={toggleChatbot}>
              ✖
            </button>
          </div>
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/13/10/20250313100155-AUO0PSSE.json"
            title="Chatbot"
            className="chatbot-iframe"
          ></iframe>
        </div>
      )}

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome, {user?.displayName || user?.email}!</h1>
      </div>

      {/* Test Sections */}
      <div className="main-content">
        <div className="tests-container">
          {[
            { name: "Diabetes", route: "/prediction" },
            { name: "Report Analysis", route: "/reportAnalysis" },
            { name: "Blood Pressure", route: "/underMaintenance" },
            { name: "Cancer Detection", route: "/underMaintenance" },
          ].map((test, index) => (
            <div
              key={index}
              className="test-box"
              onClick={() => navigate(test.route)}
            >
              <h2 className={darkMode ? "dark-mode-text" : ""}>{test.name}</h2>
              <button className="detect-btn">Start Test</button>
            </div>
          ))}
        </div>

        {/* Previous Test Results */}
        <div className="previous-tests">
          <div className="headd">Previous Test Results</div>
          <div className="test-dropdown">
            {tests.length > 0 ? (
              tests.map((test) => (
                <div key={test.id} className="test-card">
                  <strong>{test.Test_Name}</strong> -{" "}
                  {test.Prediction_Percentage.toFixed(2)}%
                  <br />
                  <small>{test.Date_Time}</small>
                </div>
              ))
            ) : (
              <div>No previous tests found</div>
            )}
          </div>
        </div>
      </div>

      {/* Health Articles Section */}
      <div className="articles-container">
  <h2 className="articles-heading">Latest Health News</h2>
  {articles.length > 0 ? (
    <div className="articles-grid">
      {articles.map((article, index) => (
        <div key={index} className="article-box">
          <img src={article.image} alt={article.title} className="article-image" />
          <h3>{article.title}</h3>
          <p>{article.source}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  ) : (
    <p>Loading news...</p>
  )}
</div>
  </div>
    );
  }

export default HomePage;
