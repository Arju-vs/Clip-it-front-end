import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import SideNavbar from '../../Components/SideNavbar/SideNavbar';
import MovieIcon from '@mui/icons-material/Movie';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './Profile.css';
import Edit from '../../Components/Edit';
import { editContext } from '../../contexts/ContextShare';
import DeleteBar from '../../Components/DeleteBar';
import Lightning from '../../bitsEffects/lightning/Lightning'
import { tokenContext } from '../../contexts/TokenAuth';
import { deleteProfileAPI, deleteVideoAPI, logoutAPI, MyProfileAPI } from '../../../services/allAPI';


const MyProfile = ({ sideNavbar}) => {
    const {authorisedUser, setAuthorisedUser} = useContext(tokenContext)
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [showEdit,setShowEdit] = useState(false)
    const { editUserResponse } = useContext(editContext)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfileData();
    }, []);

    useEffect(() => {
        if (editUserResponse) {
            setUser(editUserResponse);
        }
    }, [editUserResponse]);

    const handleEditClose = () => {
        setShowEdit(false);
        if (user) {
            setUser(prevUser => ({
                ...prevUser,
                password: ""
            }));
        }
    };
    

    const fetchProfileData = async () => {
        const userId = sessionStorage.getItem("userId");

        const res = await MyProfileAPI(userId)
        console.log(res.data);
        setUser(res.data.user)
        setData(res.data.video)

    };

    const handleLogout = () => {
        logoutAPI().then(() => {
                sessionStorage.clear();
                setAuthorisedUser(false)
                toast.success("Logout Successful!");
                setTimeout(() => {
                    navigate('/');
                }, 500);
            })
            .catch(err => console.log(err));
    };

    const handleDeleteAccount = async () => {
        const userId = sessionStorage.getItem("userId");
        const token =  sessionStorage.getItem("token")

        try {
            if (userId && token){
                const response = await deleteProfileAPI(userId,token);
                toast.success(response.data.message);
                sessionStorage.clear();
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }else{
                toast.error("Unable to delete");
                return;
            }
            
        } catch (error) {
            console.error("Deletion failed:", error.response);
            toast.error(error.response?.data?.error || "Failed to delete account.");
        }
    };
    
    const handleDeleteVideo = async (videoId) => {
        const token = sessionStorage.getItem("token");
        try {
            if (videoId && token) {
                const response = await deleteVideoAPI(videoId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
    
                toast.success(response.data.message, { autoClose: 2000 });
                setData((prevData) => prevData.filter((video) => video._id !== videoId)); // Remove deleted video from state
            } else {
                toast.error("Unable to delete video");
            }
        } catch (error) {
            console.error("Video deletion failed:", error.response);
            toast.error(error.response?.data?.error || "Failed to delete video.");
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
                        <div className='fs-1 fw-bolder mt-3 d-flex justify-content-between'>
                            {user?.channelName} 
                            <button onClick={handleLogout} className='button-55'>Logout</button>
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
                    <div className="profileButtons">
        <button title='Edit Profile' className="editProfileBtn" onClick={()=>setShowEdit(true)}> <EditNoteIcon /> </button>
        <button title='Delete Your Account' className="deleteProfileBtn" onClick={() => setShowDeleteConfirm(true)}> <DeleteForeverIcon /> </button>
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
                                <div className="videoAbout">Uploaded on: {item.createdAt.slice(0,10)}
                                    <button className="deleteVideoBtn" title="Delete Video" onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteVideo(item._id)}} >
                                        <DeleteForeverIcon />
                                    </button>
                                </div>
                            </div>
                        </Link>
                            )
                        })
                    }
                    </div>
            </div>
            </div>
            <DeleteBar show={showDeleteConfirm} handleClose={() => setShowDeleteConfirm(false)} handleDelete={handleDeleteAccount} />
            <Edit show={showEdit} handleClose={handleEditClose} user = {user} />
            <ToastContainer />
        </div>
    );
};

export default MyProfile;
