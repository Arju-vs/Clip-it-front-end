import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminVideos.css";
import { FaTrash } from "react-icons/fa";
import { adminAllVideosAPI, adminDeleteVideo, adminVideoViewers } from "../../../../services/allAPI";

const ManageVideos = () => {
    const [videos, setVideos] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [viewers, setViewers] = useState({});
    const [expandedVideoId, setExpandedVideoId] = useState(null);
    const adminToken = sessionStorage.getItem("adminToken");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await adminAllVideosAPI();
                setVideos(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchVideos();
    }, [adminToken]);

    const handleDeleteClick = (video) => {
        setSelectedVideo(video);
        setShowPopup(true);
    };

    const confirmDelete = async () => {
        if (!selectedVideo) return;

        try {
            await adminDeleteVideo(selectedVideo._id)
            setVideos(videos.filter((video) => video._id !== selectedVideo._id));
            setShowPopup(false);
            setSelectedVideo(null);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchViewers = async (videoId) => {
        if (expandedVideoId === videoId) {
            setExpandedVideoId(null);
            return;
        }
        try {
            const res = await adminVideoViewers(videoId)
            setViewers((prevViewers) => ({ ...prevViewers, [videoId]: res.data.viewers }));
            setExpandedVideoId(videoId);
        } catch (error) {
            console.error("Error fetching viewers:", error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h2 className="adminHead">Manage Videos</h2>
            <div className="table-sectionVideos">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Title</th>
                            <th>Game Name</th>
                            <th>Thumbnail</th>
                            <th>Likes</th>
                            <th>Dislikes</th>
                            <th>Views</th>
                            <th>Video Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video, index) => (
                            <tr key={video._id}>
                                <td>{index+1}</td>
                                <td>{video.userName}</td>
                                <td>{video.title}</td>
                                <td>{video.gameName}</td>
                                <td>
                                    <img src={video.thumbnail} alt="Thumbnail" className="thumbnail-img" />
                                </td>
                                <td>{video.likes}</td>
                                <td>{video.dislikes}</td>
                                <td>{video.views}</td>
                                <td>{video._id}</td>
                                <td>
                                    <FaTrash className="delete-icon" onClick={() => handleDeleteClick(video)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <h2 className="adminHead">Viewers Details</h2>
            <div className="table-sectionVideos">
                <table className="video-table">
                    <thead>
                        <tr>
                            <th>Video ID</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map(video => (
                            <React.Fragment key={video._id}>
                                <tr>
                                    <td>{video._id}</td>
                                    <td>{video.title}</td>
                                    <td>
                                        <button className="fetch-viewers-btn" onClick={() => fetchViewers(video._id)}>
                                            {expandedVideoId === video._id ? "Hide" : "Show"}
                                        </button>
                                    </td>
                                </tr>

                                {expandedVideoId === video._id && viewers[video._id] && (
                                    <>
                                        <tr className="viewer-header">
                                            <th>Viewers ID</th>
                                            <th>Viewers username</th>
                                            <th></th>
                                        </tr>


                                        {viewers[video._id].length > 0 ? (
                                            viewers[video._id].map(viewer => (
                                                <tr key={viewer._id} className="viewer-row">
                                                    <td>{viewer._id}</td>
                                                    <td>{viewer.userName}</td>
                                                    <td></td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr className="viewer-row">
                                                <td colSpan="3">No viewers available</td>
                                            </tr>
                                        )}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Popup */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Are you sure you want to delete <strong>{selectedVideo?.title}</strong>?</p>
                        <div className="popup-buttons">
                            <button className="cancel-btn" onClick={() => setShowPopup(false)}>Cancel</button>
                            <button className="confirm-btn" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageVideos;
