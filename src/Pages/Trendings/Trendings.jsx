import React, { useState ,useEffect } from 'react'
import './Trendings.css'
import Lightning from '../../bitsEffects/lightning/Lightning'
import SideNavbar from '../../Components/SideNavbar/SideNavbar'
import axios from 'axios'
import { FaCrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trendingVideosAPI } from '../../../services/allAPI'

const Trendings = ( {sideNavbar} ) => {

    const [trending, setTrending] = useState([])
    const [moreTrends, setMoreTrends] = useState([])

  useEffect(()=>{
    fetchTrendingVideos();
  },[sideNavbar])

  const fetchTrendingVideos = async () => {
    try {
        const response = await trendingVideosAPI();
        setTrending(response.data.slice(0 , 1));
        setMoreTrends(response.data.slice(1));
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching trending video');
    }
};

  return (
    <>
        <SideNavbar sideNavbar={sideNavbar}/>
        <div className={sideNavbar ? 'trendingPage' : 'fullTrendingPage'}>
        <Lightning hue={220} xOffset={0} speed={.7} intensity={1} size={1} />
        <h2 className="latestVideosHeading">Winner Winner Video Dinner </h2>
    <div className="trendingP-card">
      <h2 className="TrendingPVideosHeading">Trendings</h2>
            {trending.map((video, index) => (
                <div key={video._id} className="TPprofile-container">
                    <div className="T1"># {index + 1}</div>
                    <div className="Tprofile-wrapper">
                        <Link to={`/watch/${video._id}`} className="Tvideo-container">
                        <img className="TPprofile-pic" src={video?.user?.profilePic || '/default-avatar.png'} alt="User" />
                        <FaCrown className="Tcrown-icon" />
                       </Link>

                    </div>
                        <Link to={`/watch/${video._id}`} className="Tvideo-container">
                        <img className="trendingP1Thumbnail" src={video.thumbnail} alt={video.title} />
                        <h3 className="trendingPTitle"> {video.title}</h3>
                        <h3 className="trendingPChannelName">Channel :  {video.user.channelName}</h3>
                        <p className="trendingPViews">👀: {video.views} views</p>
                    </Link>
                </div>
            ))}
        </div>
        <div className={sideNavbar ? 'TContent' : 'fullTContent'}>
        {moreTrends.map((video, index) => (
                <div key={video._id} className="TPprofile-container">
                    <div className="TNo"># {index + 2} </div>
                    <Link to={`/user/${video.user._id}`}>
                        <div className="Tprofile-wrapper">
                            <img className="TPprofile-pic" src={video?.user?.profilePic || '/default-avatar.png'} alt="User" />
                        </div>
                    </Link>

                    <Link to={`/watch/${video._id}`} className="Tvideo-container">
                        <img className="trendingPThumbnail" src={video.thumbnail} alt={video.title} />
                        <h3 className="trendingPTitle"> {video.title}</h3>
                        <h3 className="trendingPChannelName">Channel :  {video.user.channelName}</h3>
                        <p className="trendingPViews">👀: {video.views} views</p>
                    </Link>
                </div>
            ))}
        </div>
        </div>
    </>
  )
}

export default Trendings