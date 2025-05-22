// rafce
import { useEffect, useState } from 'react';
import './Video.css';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import SideNavbar from '../../Components/SideNavbar/SideNavbar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import QuickreplyRoundedIcon from '@mui/icons-material/QuickreplyRounded';
import Lightning from '../../bitsEffects/lightning/Lightning';
import { addCommentAPI, getCommentsAPI, getVideoAPI, handleFollowAPI, getFollowStatusAPI, likeVideoAPI, unlikeVideoAPI, dislikeVideoAPI, undislikeVideoAPI, addReactionAPI, reactCountsAPI, reactuserCountsAPI, likeCommentAPI, replyCommentAPI, viewCountAPI } from '../../../services/allAPI';

const Video = ({ sideNavbar }) => {
    const [comment, setComment] = useState("");
    const [data, setData] = useState("");
    console.log(data);
    const [videoUrl, setVideoUrl] = useState("");
    const [displayComments, setDisplayComments] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [reactionCounts, setReactionCounts] = useState({});
    

    const { id } = useParams();
    const loggedInUserId = sessionStorage.getItem("userId");
    const loggedInUserPic = sessionStorage.getItem("userProfilePic")

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, []);

    useEffect(() => {
        if (data?.user?._id) {
            checkFollowStatus();
        }
    }, [data]);

    useEffect(() => {
        fetchReactions();
        if (id) incrementViewCount();
    }, [id]);

    // Fetch video details
    const fetchVideoById = async () => {
        try {
            const res = await getVideoAPI(id);
            const video = res.data.video;
            setData(video);
            setVideoUrl(video.videoLink);
            setLikes(video.likes.length);
            setDislikes(video.dislikes.length);
            setLiked(video.likes.includes(loggedInUserId));
            setDisliked(video.dislikes.includes(loggedInUserId));
        } catch (err) {
            console.error(err);
            toast.error("Error fetching video details.");
        }
    };

    // Get comments
   const getCommentByVideoId = async () => {
    try {
        const res = await getCommentsAPI(id);
        setDisplayComments(res.data.comments);
    } catch (err) {
        console.error(err);
        toast.error("Error fetching comments.");
    }
};

    const checkFollowStatus = async () => {
        try {
            const res = await getFollowStatusAPI(data?.user?._id);
            setIsFollowing(res.data.isFollowing);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFollowToggle = async () => {
        try {
            await handleFollowAPI(data?.user?._id);
            setIsFollowing(!isFollowing);
        } catch (err) {
            console.log(err);
        }
    };

    // Handle comment
    const handleComment = async () => {
        const body = {
            "message": comment,
            "video": id
        };
        try {
            const res = await addCommentAPI(body);
            const newComment = res.data.comment;
    ``
            const storedUser = JSON.parse(sessionStorage.getItem("user"));
            if (storedUser) {
                newComment.user = {
                    _id: storedUser._id,
                    channelName: storedUser.channelName,
                    profilePic: storedUser.profilePic
                };
            }
            setDisplayComments([newComment, ...displayComments]);
            setComment("");
        } catch (err) {
            console.error(err);
            toast.error("Failed to post comment");
        }
    };

    // handleLike
    const handleLike = async () => {
        try {
            if (liked) {
                setLiked(false);
                setLikes((prev) => prev - 1);
                await unlikeVideoAPI(id);
            } else {
                setLiked(true);
                setLikes((prev) => prev + 1);
                if (disliked) {
                    setDisliked(false);
                    setDislikes((prev) => prev - 1);
                }
                await likeVideoAPI(id);
            }
        } catch (err) {
            console.error(err);
            toast.error("Error updating like!!");
        }
    };


    // handleDislike
    const handleDislike = async () => {
        try {
            if (disliked) {
                setDisliked(false);
                setDislikes((prev) => prev - 1);
                await undislikeVideoAPI(id);
            } else {
                setDisliked(true);
                setDislikes((prev) => prev + 1);
                if (liked) {
                    setLiked(false);
                    setLikes((prev) => prev - 1);
                }

                await dislikeVideoAPI(id);
            }
        } catch (err) {
            console.error(err);
            toast.error("Error updating dislike!!");
        }
    };
    

    // handleLikeComment
    const handleLikeComment = async (commentId) => {
        try {
            const res = await likeCommentAPI(commentId);

            setDisplayComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId
                        ? { ...comment, likes: res.data.likes }
                        : comment
                )
            );
            getCommentByVideoId();
        } catch (err) {
            console.error(err);
            toast.error("Error updating like.");
        }
    };

    const handleReply = async (commentId) => {
        try {
            const res = await replyCommentAPI(commentId,replyText);
            const newReply = res.data.reply;
            if (!newReply.user.channelName) {
                const storedUserId = sessionStorage.getItem("userId");
                const storedProfilePic = sessionStorage.getItem("profilepic");
                
                newReply.user = {
                    ...newReply.user,
                    _id: storedUserId,
                    channelName: storedUserId === newReply.user._id ? "You" : "Unknown User",
                    profilePic: storedProfilePic || newReply.user.profilePic
                };
            }

            setDisplayComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId
                        ? { ...comment, replies: [...(comment.replies || []), newReply] }
                        : comment
                )
            );
    
            setReplyingTo(null);
            setReplyText("");
    
        } catch (err) {
            console.error("Error", err);
            toast.error("Failed to reply");
        }
    };



    const handleReaction = async (emoji) => {
        try {
            const res = await addReactionAPI(id, emoji);
            console.log( res.data);
    
            setReactionCounts(prev => {
                const updatedCounts = { ...prev };
    
                // If user had a previous reaction, reduce its count
                if (selectedReaction && updatedCounts[selectedReaction]) {
                    updatedCounts[selectedReaction] -= 1;
                }
    
                updatedCounts[emoji] = (updatedCounts[emoji] || 0) + 1;
    
                return updatedCounts;
            });
    
            setSelectedReaction(emoji);
        } catch (err) {
            toast.error("Failed to add reaction.");
        }
    };
    
    
    
    // Fetch reaction counts from the backend
    const fetchReactions = async () => {
        try {
            const res = await reactCountsAPI(id);
            setReactionCounts(res.data.reactions || {});
    
            // Fetch the user's reaction
            const userRes = await reactuserCountsAPI(id);
            setSelectedReaction(userRes.data.reaction || null);
    
        } catch (err) {
            console.error( err.response?.data || err);
        }
    };

    // handleView
    const incrementViewCount = async () => {
        const viewedVideos = JSON.parse(sessionStorage.getItem("viewedVideos")) || [];
        if (viewedVideos.includes(id)) return;
        try {
            await viewCountAPI(id);
            viewedVideos.push(id);
            sessionStorage.setItem("viewedVideos", JSON.stringify(viewedVideos));
        } catch (err) {
            console.error("Error updating view count:", err);
        }
    };

    
    
    return (
        <>
            <div className='video'>
                <SideNavbar sideNavbar={sideNavbar} />
                <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
                <div className={sideNavbar ? "videoSection" : "videofullscreen"}>
                    <div className="videoDisplay">
                        {data && (
                            <video width="400" controls autoPlay controlsList='nodownload' onPlay={incrementViewCount} onContextMenu={(e) => e.preventDefault()} className="videoDisplayVideo">
                                <source src={videoUrl} type='video/mp4' />
                                <source src={videoUrl} type='video/webm' />
                                Your Browser doesn't support the video type!
                            </video>
                        )}
                    </div>

                    <div className="videoAbout">
                        <div className="videoTitle">{data?.title}</div>
                        <div className="profileViews">{data.views} views </div>
                        <div className="videoProfile">
                            <div className="videoProfile-left">
                                <Link to={data?.user?._id === loggedInUserId ? `/myprofile/${id}` : `/user/${data?.user?._id}`} className="profile-img">
                                    <img className='profileImage' src={data?.user?.profilePic} alt="" />
                                </Link>
                                <div className="profileSubView">
                                    <div className="profileUsername">{data?.user?.channelName}</div>
                                    <div className="profileProfileSubs">{data?.createdAt ? data?.createdAt.slice(0, 10) : "unknown" }</div>
                                </div>
                                {/* Follow Button */}
                                {data?.user?._id !== loggedInUserId && (
                                    <div className="followBtn" onClick={handleFollowToggle}>
                                        {isFollowing ? "Following" : "Follow"}
                                    </div>
                                )}
                            </div>
                                {/* like */}
                            <div className="videoProfile-right">
                                <div className="videoLike" onClick={handleLike}>
                                    {liked ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
                                    <div className="videoLike_likes">{likes}</div>
                                </div>
                                <div className="vPDivider"></div>
                                <div className="vPDivider"></div>
                                {/* dislike */}
                                <div className="videoLike" onClick={handleDislike}>
                                    <NotInterestedIcon style={{ color: disliked ? "blue" : "black" }} />
                                    <div className="videoLike_likes">{dislikes}</div>
                                </div>
                            </div>

                        </div>
                        <div className="videoDesc">
                            <div className='row'>
                                <div className='col-6 descLeft'>
                                    <h5 className='aText'>About</h5>
                                    <div className='aText'>{data?.description}</div>
                                </div>
                                <div className="col-6 ">
                                    <div className="descLeft">
                                    <h5 className='d-flex justify-content-center aText'> React Corner!!!</h5>
                                    <div className="reactionButtons">
                                        <div className="reactions">
                                            {['❤️', '😂' ,'😢','💯', '🔥', '😡'].map((emoji) => (
                                                <div key={emoji} style={{ display: 'inline-block', textAlign: 'center', margin: '10px' }}>
                                                    <span 
                                                        onClick={() => handleReaction(emoji)}
                                                        className='reactionButton' 
                                                        style={{ cursor: 'pointer', fontSize: '24px', opacity: selectedReaction === emoji ? 1 : 0.5 }}
                                                    >
                                                        {emoji}
                                                    </span>
                                                    <div className='reactionCount'>
                                                        {reactionCounts[emoji] || 0} {/* Show count, default to 0 */}
                                                    </div>
                                                </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="commentSection">
                        <div className='fs-4 fw-bolder'>{displayComments.length} Comments</div>

                        <div className="commentP">
                            <img className='commentProfile' src={loggedInUserPic} alt="" />
                            <div className="addComment">
                                <input
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    type="text"
                                    className='addCommentInput'
                                    placeholder='Drop your Comment <3'
                                />
                                <div className="buttons">
                                    <div onClick={() => setComment("")} className="cancel">Destroy</div>
                                    <div onClick={handleComment} className="drop">Drop IN</div>
                                </div>
                            </div>
                        </div>
                        <div className="othersComment">
                            {displayComments.map((item, index) => (
                                <div className="comment" key={index}>
                                    <Link to={data?.user?._id === loggedInUserId ? `/myprofile/${id}` : `/user/${item?.user?._id}`} className="profile-img">
                                        <img className="commentProfile" src={item?.user?.profilePic || loggedInUserPic} alt="" />
                                    </Link>
                                    <div className="othersCommentSection">
                                        <div className="othersCommentSectionHeader">
                                            <div className="channelName ms-3"> ⇰ {item?.user?.channelName}</div>
                                            <div className="commentTimings">{item?.createdAt.slice(0, 10)}</div>

                                            <button className="commentLikeBtn" title='like'  onClick={() => handleLikeComment(item._id)}>
                                            <FavoriteIcon className='fs-4' />{item?.likes?.length || 0}
                                            </button>

                                            <button className="commentReplyBtn" title='reply' onClick={() => setReplyingTo(item._id)}>
                                            <QuickreplyRoundedIcon className='fs-5' /> {item?.replies?.length || 0}
                                            </button>
                                        </div>

                                        <div className="othersCommentSectionComment">{item?.message}</div>
                                            {/* Reply Form - Only Shows for Selected Comment */}
                                            {replyingTo === item._id && (
                                                <div className="replyForm">
                                                    <input
                                                        type="text"
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        placeholder="Write a reply..."
                                                        className="replyInput"
                                                    />
                                            <button className='drop' onClick={() => handleReply(item._id)}>Submit</button>
                                        </div>
                                        )}
                                        {/* Display Replies */}
                                        {item.replies && item.replies.length > 0 && (
                                            <div className="replies">
                                                {item.replies.map((reply, replyIndex) => (
                                                    reply ? (
                                                        <div className="reply" key={replyIndex}>
                                                            <Link className="replyUser" to={reply?.user?._id === loggedInUserId ? `/myprofile/${id}` : `/user/${reply?.user?._id}`}>
                                                                ↪<img className='replyProfile ms-2 me-2' src={reply?.user?.profilePic} alt="" />
                                                                {reply?.user?.channelName || "Unknown User"}
                                                            </Link> <span className="replyTimings">{item?.createdAt.slice(0, 10)}</span> 
                                                            <div className='replyData'>{reply?.message || "No message available"}</div>
                                                            
                                                        </div>
                                                    ) : null
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Video;
