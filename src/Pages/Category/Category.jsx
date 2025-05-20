import { useContext, useState } from "react";
import "./Category.css";
import { Link } from "react-router-dom";
import Lightning from "../../bitsEffects/lightning/Lightning";
import { VideoContext } from "../../contexts/ContextShare";
import SideNavbar from "../../Components/SideNavbar/SideNavbar";

const VideoPage = ({ sideNavbar }) => {
  const { filteredVideos, gameNames, filterVideosByGame, selectedGame } = useContext(VideoContext);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
        <SideNavbar sideNavbar={sideNavbar}/>
        <div className={sideNavbar ? "videoPage" : "fullVideoPage"}>
          <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
    
          <div className="topBar">
            {/* Filter Buttons */}
            <button className="mainFilterBtn" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Hide" : "Filter"}
            </button>
          </div>
    
          {showFilters && (
            <div className="filterButtons">
              {gameNames.map((game) => (
                <button
                  key={game}
                  className={`filterBtn ${selectedGame === game ? "active" : ""}`}
                  onClick={() => filterVideosByGame(game)}
                >
                  {game}
                </button>
              ))}
            </div>
          )}

          {!selectedGame && (
            <div className="selectGameMessage">
              <h2>Please select a game name to view videos</h2>
            </div>
          )}
    
          <div className={sideNavbar ? "videoContent" : "videoContentWithoutBar"}>
            {filteredVideos.map((item) => (
              <Link to={`/watch/${item._id}`} className="vgamingContent" key={item._id}>
                <div className="vgameThumbnail">
                  <img src={item.thumbnail} alt="thumbnail" className="vgameThumbnailPic" />
                  <div className="vvidTimeLeft">{item.likes.length} likes</div>
                  <div className="vvidTimeRight">{item.views} views</div>
                </div>
    
                <div className="vgameTitleBox">
                  <div className="vgameTitleProfile">
                    <img src={item.user.profilePic} alt="profile" className="vgameProfilePic" />
                  </div>
    
                  <div className="vgameTitleBox_title">
                    <div className="vgameVideoTitle">{item.title}</div>
                    <div className="vgameVideoChannel">{item.user.channelName}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </>
  );
};

export default VideoPage;
