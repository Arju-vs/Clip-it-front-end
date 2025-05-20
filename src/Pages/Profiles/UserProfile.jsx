import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import SideNavbar from '../../Components/SideNavbar/SideNavbar';
import MovieIcon from '@mui/icons-material/Movie';
import './Profile.css';
import Lightning from '../../bitsEffects/lightning/Lightning';
import { getFollowStatusAPI, handleFollowAPI, profileAPI } from '../../../services/allAPI';

const UserProfile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const loggedInUserId = sessionStorage.getItem("userId");

    useEffect(() => {
        fetchProfileData();
        if (id) {
            checkFollowStatus();
        }
    }, [id]);

    const fetchProfileData = async () => {
        profileAPI(id).then((res) => {
                setData(res.data.video);
                setUser(res.data.video[0]?.user);
            })
            .catch(err => console.log(err));
    };

    const checkFollowStatus = async () => {
        try {
            const res = await getFollowStatusAPI(id)
            setIsFollowing(res.data.isFollowing);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFollowToggle = async () => {
        try {
            await handleFollowAPI(id)
            setIsFollowing(!isFollowing);
            fetchProfileData();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='profile'>
        <Lightning hue={220} xOffset={0} speed={.7} intensity={1} size={1} />
            <SideNavbar sideNavbar={sideNavbar} />
            <div className={sideNavbar ? "profile_page" : "profile_fullpage"}>
                <div className="topSection">
                    <div className='topSection_profile'>
                        <img src={user?.profilePic} alt="profile" className="profileTopImage" />
                    </div>

                    <div className="topSection_about">
                        <div className='fs-2 fw-bolder mt-3 d-flex '>{user?.channelName} 
                            {/* Follow Button */}
                            {data?.user?._id !== loggedInUserId && (
                                    <div className="followBtn1" onClick={handleFollowToggle}>
                                        {isFollowing ? "Following" : "Follow"}
                                    </div>
                                )}
                        </div>
                        <div className="aboutInfo">
                            {user?.userName} || {data?.length} videos
                        </div>
                        <div className="aboutInfo">
                            {user?.about}
                        </div>
                        <div className="aboutInfo fs-4">
                            followers: {user?.followers?.length} || followings: {user?.followings?.length}
                        </div>
                    </div>
                </div>

                <div className="bottomSection">
                <div className="videoTitle">Videos &nbsp; <MovieIcon /></div>

                    <div className="videos">

                    {
                        data.map((item,index)=>{
                            return(
                                <Link to={`/watch/${item._id}`} className="videoBlock">
                            <div className="videoThumbnail">
                                <img src={item.thumbnail} alt="profile" className="thumbnail_img" />
                            </div>

                            <div className="videoDetails">
                                <div className="videoDetailTitle">{item.title}</div>
                                <div className="uvideoAbout">Upload Time: {item.createdAt.slice(0,10)}</div>
                            </div>
                        </Link>
                            )
                        })
                    }
                        
                    </div>
            </div>
            </div>
        </div>
    );
};

export default UserProfile;
