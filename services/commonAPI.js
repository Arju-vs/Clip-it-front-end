import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody = null, reqHeader = {}, isAdmin = false) => {
    try {
        const token = isAdmin ? sessionStorage.getItem("adminToken") : sessionStorage.getItem("token");

        const reqConfig = {
            method: httpMethod,
            url,
            ...(reqBody && { data: reqBody }), // ✅ Only include `data` if reqBody is not null
            headers: {
                ...(reqBody && { "Content-Type": "application/json" }), // ✅ Only set content-type if there's a body
                ...(token && { Authorization: `Bearer ${token}` }),
                ...reqHeader,
            },
            withCredentials: true,
        };

        const response = await axios(reqConfig);
        return response;
    } catch (error) {
        console.error(`API Error [${httpMethod} ${url}]:`, error.response?.data || error.message);
        throw error;
    }
};

export default commonAPI;
