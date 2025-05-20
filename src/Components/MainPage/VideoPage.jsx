// rafce
import { useEffect, useState } from 'react'
import './VideoPage.css'
import { Link } from 'react-router-dom'
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Lightning from '../../bitsEffects/lightning/Lightning'
import { allVideosSearchAPI } from '../../../services/allAPI';

const VideoPage = ({ sideNavbar }) => {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
      allVideosSearchAPI(searchQuery).then(res => {
        console.log(res.data.videos);
        setData(shuffleArray(res.data.videos))
      }).catch(err => {
        console.log(err);
      })
    }, [searchQuery])

    

    const shuffleArray = (array) => {
      let shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

  return (
    <div className={sideNavbar ? 'videoPage' : 'fullVideoPage'}>
      <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
        <div className="topBar">
                <button className="searchBtn" title='search' onClick={() => setShowSearch(!showSearch)}>
                    {showSearch ? <CloseIcon /> : <SearchIcon />}
                </button>

                <input
                    type="text"
                    className={`searchInput ${showSearch ? "show" : ""}`}
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          <div className={sideNavbar ? "videoContent" : "videoContentWithoutBar"}>
    
            {
              data?.map((item, index) => {
                return (
                  <Link to={`/watch/${item?._id}`} className="vgamingContent">
                    <div className="vgameThumbnail">
                      <img src={item?.thumbnail} alt="thumbnail" className="vgameThumbnailPic" />
                      <div className="vvidTimeLeft">
                        {item?.likes.length} likes
                      </div>
                      <div className="vvidTimeRight">
                        {item?.views} views
                      </div>
                    </div>
    
                    <div className="vgameTitleBox">
                      <div className="vgameTitleProfile">
                        <img src={item?.user.profilePic} alt="profile" className="vgameProfilePic" />
                      </div>
    
                      <div className="vgameTitleBox_title">
                        <div className="vgameVideoTitle">{item?.title}</div>
                        <div className="vgameVideoChannel">{item?.user.channelName}</div>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
            
          </div>
        </div>
  )
}

export default VideoPage