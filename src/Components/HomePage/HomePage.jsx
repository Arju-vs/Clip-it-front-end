// rafce
import React, { useEffect, useState } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import Lightning from '../../bitsEffects/lightning/Lightning'
import Display from '../../Components/Carousel/Display'
import TiltedCard from '../../bitsEffects/tiltedCard/Tilt'
import c1 from '../../assets/c1.jpg'
import c2 from '../../assets/c2.jpg'
import c3 from '../../assets/c3.jpg'
import { FaCrown } from 'react-icons/fa';
import Contact from '../Contact'
import Footer from '../Footer'
import { allVideosAPI, trendingVideosAPI } from '../../../services/allAPI'

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([])
  const [trending, setTrending] = useState([])

  useEffect(() => {
    allVideosAPI().then(res => {
      console.log(res.data.videos);
      const sortedVideos = res.data.videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setData(sortedVideos.slice(0, 5));
    }).catch(err => {
      console.log(err);
    });

    fetchTrendingVideos();
  }, [sideNavbar])

  const fetchTrendingVideos = async () => {
    try {
        const response = await trendingVideosAPI();
        setTrending(response.data.slice(0, 1));
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching trending video');
    }
};

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
  <Lightning hue={220} xOffset={0} speed={.7} intensity={1} size={1} />

  <div className="carousal">
    <Display />
  </div>

  <h2 className="latestVideosHeading">Fresh Contents</h2>
  
  <div className="contentWrapper">
    <marquee>
      <div className={sideNavbar ? "homeContent" : "homeContentWithoutBar"}>
        {
        data?.length>0 ?
        data?.map((item, index) => (
          <Link to={`/watch/${item?._id}`} className="gamingContent" key={index}>
            <div className="gameThumbnail">
              <img src={item?.thumbnail} alt="thumbnail" className="gameThumbnailPic" />
              <div className="vidTimeLeft">
                          {item?.likes.length} likes
                        </div>
                        <div className="vidTimeRight">
                          {item?.views} views
                        </div>
            </div>
            <div className="gameTitleBox">
              <div className="gameTitleProfile">
                <img src={item?.user.profilePic} alt="profile" className="gameProfilePic" />
              </div>
              <div className="gameTitleBox_title">
                <div className="gameVideoTitle">{item?.title}</div>
                <div className="gameVideoChannel">{item?.user.channelName}</div>
              </div>
            </div>
          </Link>
        )):
        <div className="text-white">No Contents</div>
        }
      </div>
    </marquee>
    <h2 className="latestVideosHeading">What's Inside</h2>
    <div className="tiltCards">
      <TiltedCard imageSrc={c1} altText="Upload & Share" captionText="Upload & Share" containerHeight="300px" containerWidth="300px" imageHeight="300px" imageWidth="300px" rotateAmplitude={20} scaleOnHover={.9} showMobileWarning={false} showTooltip={true} displayOverlayContent={true} overlayContent={<p className="tilted-card-demo-text">Upload & Share</p>} />

      <TiltedCard imageSrc={c2} altText="Engage & React" captionText="Engage & React" containerHeight="300px" containerWidth="300px" imageHeight="300px" imageWidth="300px" rotateAmplitude={20} scaleOnHover={.9} showMobileWarning={false} showTooltip={true} displayOverlayContent={true} overlayContent={<p className="tilted-card-demo-text">Engage & React</p>} />

      <TiltedCard imageSrc={c3} altText="Follow & Discover" captionText="Follow & Discover" containerHeight="300px" containerWidth="300px" imageHeight="300px" imageWidth="300px" rotateAmplitude={20} scaleOnHover={.9} showMobileWarning={false} showTooltip={true} displayOverlayContent={true} overlayContent={<p className="tilted-card-demo-text">Follow & Discover</p>} />
    </div>
    <h2 className="latestVideosHeading">Winner Winner Video Dinner </h2>
    <div className="trending-card">
      <h2 className="TrendingVideosHeading">Top #1 </h2>
            {trending.map((video) => (
                <div key={video._id} className="Tprofile-container">
                    <div className="profile-wrapper">
                        <img className="Tprofile-pic" src={video?.user?.profilePic || '/default-avatar.png'} alt="User" />
                        <FaCrown className="crown-icon" />
                    </div>

                    <Link to={`/watch/${video._id}`} className="Tvideo-container">
                        <img className="trendingThumbnail" src={video.thumbnail} alt={video.title} />
                        <h3 className="trendingTitle"> {video.title}</h3>
                        <h3 className="trendingChannelName">Channel :  {video.user?.channelName}</h3>
                        <p className="trendingViews">👀: {video.views} views</p>
                    </Link>
                </div>
            ))}
            <Link className='TNavigator' to={`/trendings`}>Click to see Top #5 videos</Link>
        </div>
        <Contact />
        <Footer />
  </div>
</div>

  )
}

export default HomePage