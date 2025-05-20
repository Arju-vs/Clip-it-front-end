import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./song.css";

const Music = () => {
  const [audio] = useState(new Audio("/bgsong.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  return (
    <button className={`music-btn ${isPlaying ? "playing" : ""}`} onClick={playMusic}>
      {isPlaying ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default Music;
