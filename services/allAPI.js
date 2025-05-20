import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

// registerAPI
export const registerAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVER_BASE_URL}/auth/signUp`, reqBody)
}

// loginAPI
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVER_BASE_URL}/auth/login`, reqBody)
}

// logout
export const logoutAPI = async ()=>{
    return await commonAPI("POST", `${SERVER_BASE_URL}/auth/logout`, {}, { withCredentials: true })
}

// addVideo
export const addVideoAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST", `${SERVER_BASE_URL}/api/video`,reqBody,reqHeader)
}

// allVideos
export const allVideosAPI = async ()=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/allVideos`)
}

// allVideosSearch
export const allVideosSearchAPI = async (searchQuery)=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/allVideos?search=${searchQuery}`)
}

// Myprofile
export const MyProfileAPI = async (userId)=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/auth/user/${userId}`)
}


// userProfile
export const userProfileAPI = async (userId)=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/${userId}/channel`)
}

// profileAPI
export const profileAPI = async (id)=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/${id}/channel`)
}

// deleteProfile
export const deleteProfileAPI = async (userId)=>{
    return await commonAPI("DELETE", `${SERVER_BASE_URL}/auth/delete/${userId}`, {}, {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    })
}

// editProfile
export const editProfileAPI = async (id,reqBody)=>{
    return await commonAPI("PUT", `${SERVER_BASE_URL}/auth/${id}/edit`, reqBody, {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    })
}

// deleteVideo
export const deleteVideoAPI = async (videoId)=>{
    return await commonAPI("DELETE", `${SERVER_BASE_URL}/api/delete/${videoId}`, {}, {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    })
}

// getVideo
export const getVideoAPI = async (id)=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/getVideoById/${id}`)
}

// trendingVideos
export const trendingVideosAPI = async ()=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/trending`)
}

// addComment
export const addCommentAPI = async (reqBody)=>{
    return await commonAPI("POST", `${SERVER_BASE_URL}/commentApi/comment`,reqBody, { withCredentials: true })
}

// getComments
export const getCommentsAPI = async (id)=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/commentApi/comment/${id}`,{})
}

// handleFollow
export const handleFollowAPI = async (userId)=>{
    return await commonAPI("PUT", `${SERVER_BASE_URL}/follow/${userId}`,{}, {
        withCredentials: true,
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });
};

// getFollowStatus
export const getFollowStatusAPI = async (userId)=>{
    return await commonAPI("GET", `${SERVER_BASE_URL}/follow/status/${userId}`,{}, { 
        withCredentials: true,
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    })
}

// LikeVideo
export const likeVideoAPI = async (videoId) => {
    return await commonAPI("PUT", `${SERVER_BASE_URL}/api/video/like/${videoId}`, {}, { withCredentials: true });
};

// UnlikeVideo
export const unlikeVideoAPI = async (videoId) => {
    return await commonAPI("PUT", `${SERVER_BASE_URL}/api/video/unlike/${videoId}`, {}, { withCredentials: true });
};

// DislikeVideo
export const dislikeVideoAPI = async (videoId) => {
    return await commonAPI("PUT", `${SERVER_BASE_URL}/api/video/dislike/${videoId}`, {}, { withCredentials: true });
};

// UndislikeVideo
export const undislikeVideoAPI = async (videoId) => {
    return await commonAPI("PUT", `${SERVER_BASE_URL}/api/video/undislike/${videoId}`, {}, { withCredentials: true });
};

// reactVideo
export const addReactionAPI = async (videoId, emoji) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/api/video/react/add/${videoId}`, { type: emoji }, { withCredentials: true });
};

// reactCounts
export const reactCountsAPI = async (id) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/video/react/getCounts/${id}`, {}, { withCredentials: true });
};

// reactCounts
export const reactuserCountsAPI = async (id) => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/video/react/user/${id}`, {}, { withCredentials: true });
};

// likeComment
export const likeCommentAPI = async (commentId) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/api/comment/like/${commentId}`, {}, { withCredentials: true });
};

// replyComment
export const replyCommentAPI = async (commentId, replyText) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/api/comment/reply/${commentId}`, { message: replyText}, { withCredentials: true });
};

// addviewCount
export const viewCountAPI = async (id) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/api/view/${id}`, {}, { withCredentials: true });
};

// getWorks
export const getWorksAPI = async () =>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/work/getWorks`,{},{},false)
}

// getOneWork
export const getOneWorkAPI = async (id)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/work/getwork/${id}`)
}

// addContactus
export const addContactus = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/contact/message`,reqBody,{},false)
}

// ----------------Admin Section------------------

// adminLoginAPI
export const adminLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/api/admin/login`, reqBody);
};

// adminStats
export const adminStatsAPI = async () => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/admin/stats`, null, {}, true);
};

// adminStatsVideo
export const adminStatsVideoAPI = async () => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/admin/user-video-stats`, null, {}, true);
};

// adminLatestUsers
export const adminLatestUsersAPI = async () => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/admin/latest-users`, null, {}, true);
};

// adminGetUsers
export const adminGetUsersAPI = async () => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/admin/get-users`, null, {}, true);
};

// adminDeleteUser
export const adminDeleteUser = async (id)=>{
    return await commonAPI("DELETE", `${SERVER_BASE_URL}/api/admin/delete/${id}`,null,{},true)
}

// adminLatestVideos
export const adminLatestVideosAPI = async () => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/admin/latest-videos`, null, {}, true);
};

// adminAllVideos
export const adminAllVideosAPI = async () => {
    return await commonAPI("GET", `${SERVER_BASE_URL}/api/admin/get-videos`, null, {}, true);
};

// adminDeleteVideo
export const adminDeleteVideo = async (id)=>{
    return await commonAPI("DELETE", `${SERVER_BASE_URL}/api/admin/videos/${id}`, null, {}, true)
}

// adminVideoViewers
export const adminVideoViewers = async (id)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/admin/video/${id}/viewers`, null,{},true)
}

// adminGetComments
export const adminGetComments = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/admin/get-videos-comments`,null,{},true)
}

// adminGetComments
export const adminGetVideoComments = async (id)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/admin/video/${id}/comments`,null,{},true)
}

// adminDeleteVideoComment
export const adminDeleteVideoComment = async (id)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/api/admin/comment/${id}`,null,{},true)
}

// adminDeleteCommentReply
export const adminDeleteCommentReply = async (videoId,replyId)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/api/admin/comment/${videoId}/reply/${replyId}`,null,{},true)
}

// adminGetContactus
export const adminGetContactus = async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/admin/contacts`,null,{},true)
}

export const adminReplyToMessage = async (reqBody) => {
  return await commonAPI("POST",`${SERVER_BASE_URL}/api/admin/reply`,reqBody,{},true);
}



// adminAddWorks
export const adminAddWorkAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/api/admin/addwork`,reqBody,{},true)
}

// adminGetWorks
export const adminGetWorksAPI = async()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/api/admin/getwork`,{},{},true)
}

// adminEditWorks
export const adminEditWorks = async(id,updatedData)=>{
    return await commonAPI("PUT",`${SERVER_BASE_URL}/api/admin/updatework/${id}`,updatedData,{},true)
}

// adminRemoveWorks
export const adminRemoveWorks = async(id)=>{
    return await commonAPI("DELETE",`${SERVER_BASE_URL}/api/admin/deletework/${id}`,{},{},true)
}


