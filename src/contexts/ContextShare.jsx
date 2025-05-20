import React, {createContext, useState, useEffect} from 'react'
import { allVideosAPI } from '../../services/allAPI';

export const addVideoContext = createContext()
export const editContext = createContext()
export const VideoContext = createContext();

const ContextShare = ({children}) => {
  const [addVideoResponse, setAddVideoResponse] = useState(null)
  const [editUserResponse, setEditUserResponse] = useState(null)

  const [allVideos, setAllVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]); 
  const [gameNames, setGameNames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await allVideosAPI();
      const videoList = response.data.videos;
      setAllVideos(videoList);

      const uniqueGames = [...new Set(videoList.map((video) => video.gameName))];
      setGameNames(uniqueGames);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // Function to filter videos by selected game
  const filterVideosByGame = (game) => {
    setSelectedGame(game);
    const filtered = allVideos.filter((video) => video.gameName === game);
    setFilteredVideos(filtered);
  };

  return (
    <addVideoContext.Provider value={{addVideoResponse,setAddVideoResponse}}>
      <editContext.Provider value={{editUserResponse,setEditUserResponse}}>
          <VideoContext.Provider value={{ filteredVideos, gameNames, filterVideosByGame, selectedGame }}>
            {children}
          </VideoContext.Provider >
      </editContext.Provider>
    </addVideoContext.Provider>
  )
}

export default ContextShare;
