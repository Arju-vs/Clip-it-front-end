import { useEffect, useState } from "react";
import './AdminDashboard.css'
import StatsGraph from "../../components/StatsGraph/StatsGraph";
import { adminLatestUsersAPI, adminLatestVideosAPI, adminStatsAPI } from "../../../../services/allAPI";

const AdminDashboard = ({videoStats}) => {
    const [stats, setStats] = useState({ totalUsers: 0, totalVideos: 0, totalComments: 0 });
    const [latestUsers, setLatestUsers] = useState([]);
    const [latestVideos, setLatestVideos] = useState([]);

    useEffect(()=>{
        fetchLatestUsers();
        fetchLatestVideos();
        fetchStats();
    },[])

    const fetchStats = async () => {
        try {
            const res = await adminStatsAPI();
            setStats(res.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };


    const fetchLatestUsers = async () => {
        try {
          const res = await adminLatestUsersAPI();
          setLatestUsers(res.data);
        } catch (err) {
          console.error("Error fetching latest users:", err);
        }
      };
  
      const fetchLatestVideos = async () => {
        try {
          const res = await adminLatestVideosAPI();
          setLatestVideos(res.data);
        } catch (err) {
          console.error("Error fetching latest videos:", err);
        }
      };


    return (
        <div className="dashboard">
            <h2 className="adminHead">Admin Dashboard</h2>
            <h2 className="adminHead fs-5 my-2">In our site, our gamers interaction</h2>
            <div className="stats-container">
                <div className="stat-card">Total Users: {stats.totalUsers}</div>
                <div className="stat-card">Total Videos: {stats.totalVideos}</div>
                <div className="stat-card">Total Comments: {stats.totalComments}</div>
            </div>
            <StatsGraph videoStats={videoStats} />

        <div className="table-section">
        <h3>Latest Users</h3>
        <table>
          <thead >
            <tr>
              <th>#</th>
              <th>Channel Name</th>
              <th>Username</th>
              <th>User ID</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {latestUsers.map((user,index) => (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.channelName}</td>
                <td>{user.userName}</td>
                <td>{user._id}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-section">
        <h3>Recently Uploaded Videos</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Video ID</th>
              <th>Uploaded By</th>
              <th>Uploaded At</th>
            </tr>
          </thead>
          <tbody>
            {latestVideos.map((video,index) => (
              <tr key={video._id}>
                <td>{index+1}</td>
                <td>{video.title}</td>
                <td>{video._id}</td>
                <td>{video.user.channelName}</td>
                <td>{new Date(video.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default AdminDashboard;
