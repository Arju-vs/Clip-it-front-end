import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminComments.css";
import { FaTrash } from "react-icons/fa";
import { adminDeleteCommentReply, adminDeleteVideoComment, adminGetComments, adminGetVideoComments } from "../../../../services/allAPI";

const AdminComments = () => {
    const [videos, setVideos] = useState([]);
    const [comments, setComments] = useState({});
    const [expandedVideoId, setExpandedVideoId] = useState(null);
    const [expandedReplies, setExpandedReplies] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [selectedReply, setSelectedReply] = useState(null);
    const adminToken = sessionStorage.getItem("adminToken");

    useEffect(() => {
        fetchVideosWithComments();
    }, []);

    const fetchVideosWithComments = async () => {
            try {
                const res = await adminGetComments()
                setVideos(res.data);
            } catch (error) {
                console.error("Error fetching videos:", error.response?.data?.message || error.message);
            }
        };

    const fetchComments = async (videoId) => {
        if (expandedVideoId === videoId) {
            setExpandedVideoId(null);
            return;
        }
        try {
            const res = await adminGetVideoComments(videoId)
            setComments((prev) => ({ ...prev, [videoId]: res.data.comments }));
            setExpandedVideoId(videoId);
        } catch (error) {
            console.error("Error fetching comments:", error.response?.data?.message || error.message);
        }
    };

    const toggleReplies = (commentId) => {
        setExpandedReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleDeleteCommentClick = (comment) => {
        setSelectedComment(comment);
        setSelectedReply(null);
        setShowPopup(true);
    };

    const handleDeleteReplyClick = (reply, commentId) => {
        setSelectedReply({ reply, commentId });
        setSelectedComment(null);
        setShowPopup(true);
    };

    const confirmDelete = async () => {
        if (selectedComment) {
            try {
                await adminDeleteVideoComment(selectedComment._id)
                setComments((prev) => ({
                    ...prev,
                    [expandedVideoId]: prev[expandedVideoId].filter((c) => c._id !== selectedComment._id),
                }));
                setShowPopup(false);
                setSelectedComment(null);
            } catch (error) {
                console.error("Error deleting comment:", error.response?.data?.message || error.message);
            }
        }

        if (selectedReply) {
            try {
                await adminDeleteCommentReply(selectedReply.commentId,selectedReply.reply._id)

                setComments((prev) => ({
                    ...prev,
                    [expandedVideoId]: prev[expandedVideoId].map((c) =>
                        c._id === selectedReply.commentId
                            ? { ...c, replies: c.replies.filter((r) => r._id !== selectedReply.reply._id) }
                            : c
                    ),
                }));

                setShowPopup(false);
                setSelectedReply(null);
            } catch (error) {
                console.error("Error deleting reply:", error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div>
            <h2 className="adminHead">Manage Comments</h2>
            <div className="table-sectionComments">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Video Title</th>
                            <th>Comments Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video, index) => (
                            <React.Fragment key={video._id}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{video.title}</td>
                                    <td>{video.commentCount}</td>
                                    <td>
                                        <button className="fetch-comments-btn" onClick={() => fetchComments(video._id)}>
                                            {expandedVideoId === video._id ? "Hide" : "Show"}
                                        </button>
                                    </td>
                                </tr>

                                {expandedVideoId === video._id && comments[video._id] && (
                                    <tr>
                                        <td colSpan="4">
                                            <div className="comments-container">
                                                <table>
                                                    <thead>
                                                        <tr className="comment-header">
                                                            <th>#</th>
                                                            <th>User</th>
                                                            <th>Comment</th>
                                                            <th>Likes</th>
                                                            <th>Replies</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {comments[video._id].length > 0 ? (
                                                            comments[video._id].map((comment, idx) => (
                                                                <React.Fragment key={comment._id}>
                                                                    <tr className="comment-row">
                                                                        <td>{idx + 1}</td>
                                                                        <td>{comment.user?.userName || "Unknown"}</td>
                                                                        <td>{comment.message}</td>
                                                                        <td>{comment.likes.length}</td>
                                                                        <td>
                                                                            <button className="show-replies-btn" onClick={() => toggleReplies(comment._id)}>
                                                                                {expandedReplies[comment._id] ? "Hide Replies" : "Show Replies"}
                                                                            </button>
                                                                        </td>
                                                                        <td>
                                                                        <FaTrash className="delete-icon" onClick={() => handleDeleteCommentClick(comment)} />
                                                                        </td>
                                                                    </tr>

                                                                    {expandedReplies[comment._id] && comment.replies.length > 0 && (
                                                                        <>
                                                                            <tr className="reply-header">
                                                                                <th>Replies</th>
                                                                                <th>User Id</th>
                                                                                <th>Reply</th>
                                                                                <th>Actions</th>
                                                                            </tr>
                                                                            {
                                                                            comment.replies.map((reply) => (
                                                                                <tr key={reply._id} className="reply-row">
                                                                                    <td>→</td>
                                                                                    <td>{reply._id}</td>
                                                                                    <td>{reply.message}</td>
                                                                                    <td>
                                                                                        <FaTrash className="delete-icon" onClick={() => handleDeleteReplyClick(reply, comment._id)} />
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                </React.Fragment>
                                                            ))
                                                        ) : (
                                                            <tr className="comment-row">
                                                                <td colSpan="5">No comments available</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
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
                        <p>Are you sure you want to delete this {selectedComment ? "comment" : "reply"}?</p>
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

export default AdminComments;
