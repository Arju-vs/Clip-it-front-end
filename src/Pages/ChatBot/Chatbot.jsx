import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { createChatBotMessage } from "react-chatbot-kit";
import axios from "axios";
import Lightning from "../../bitsEffects/lightning/Lightning";
import "./Chatbot.css";


const fetchGameRecommendations = async (query) => {
  const url = "https://clipit-back-end.onrender.com/igdb/games";
  const headers = { "Content-Type": "text/plain" };

  let body = `
  fields name, genres.name, cover.url, platforms.name, first_release_date;
  where platforms = (6, 34, 39) 
    & first_release_date > 946684800 
    & category = (0, 8, 9);
  limit 6;
`;

if (query) {
 body = `
   search "${query}";
   fields name, genres.name, cover.url, platforms.name, first_release_date;
   where platforms = (6, 34, 39) 
     & first_release_date > 946684800
     & category = (0, 8, 9);
   limit 6;
 `;
}


  try {
    const response = await axios.post(url, body, { headers });

    if (!response.data.length) {
      return [{ name: "No games found.", coverUrl: null, platforms: null }];
    }

    return response.data.map((game) => ({
      name: game.name,
      coverUrl: game.cover ? game.cover.url : null,
      platforms: game.platforms ? game.platforms.map((p) => p.name).join(", ") : null,
    }));
  } catch (error) {
    console.error("Error fetching games:", error.response || error.message);
    return [{ name: "Error fetching games. Please try again.", coverUrl: null, platforms: null }];
  }
};



const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleGameQuery = async (query) => {
    const gameResults = await fetchGameRecommendations(query);

    const botMessages = gameResults.map((game) =>
      createChatBotMessage(
        <div className="game-message">
          {game.coverUrl && <img src={game.coverUrl} alt={game.name} className="game-cover" />}
          <p className="game-name">{game.name}</p>
          {game.platforms && <p className="game-platforms">Platforms: {game.platforms}</p>}
        </div>
      )
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, ...botMessages],
    }));
  };

  return <>{React.cloneElement(children, { actions: { handleGameQuery } })}</>;
};


// MessageParser
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (actions && actions.handleGameQuery) {
      actions.handleGameQuery(message);
    }
  };

  return React.cloneElement(children, { parse });
};

// Chatbot Configuration
const botConfig = {
  botName: "GameBot",
  initialMessages: [createChatBotMessage("Hello! What type of game are you looking for?")],
};

const GameChatbot = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  return (
    <>
      <Lightning />
      <div className="main-container">
        {/* Introduction Section */}
        <div className="intro-section">
          <h1 className="chatHead1">Welcome to CLIPBot</h1>
          <p className="chatP">
            CLIPBot helps you find the best games based on your preferences. Just type what you're looking for, and our AI-powered chatbot will give you recommendations!
          </p>
          <button className="chatbot-toggle" onClick={() => setIsChatbotVisible(!isChatbotVisible)}>
            {isChatbotVisible ? "Close Chat" : "Start Chat"}
          </button>
        </div>
  
        {/* Chatbot Window */}
        {isChatbotVisible && (
          <div className="chatbot-container">
            <div className="chatbot-window">
              <div className="chatbot-header">GameBot</div>
              <div className="chatbot-messages">
                <Chatbot
                  config={botConfig}
                  messageParser={(props) => <MessageParser {...props} />}
                  actionProvider={(props) => <ActionProvider {...props} />}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GameChatbot;
