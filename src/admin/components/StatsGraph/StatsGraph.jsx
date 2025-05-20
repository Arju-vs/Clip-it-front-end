import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './statsGraph.css'
import { useState,useEffect } from "react";
import { adminStatsVideoAPI } from "../../../../services/allAPI";

const COLORS = ["#17c700", "#ff0000"];

const statsGraph = () => {

    const [videoStats, setVideoStats] = useState([]);

  useEffect(() => {
    const fetchVideoStats = async () => {
      try {
          const res = await adminStatsVideoAPI();
          setVideoStats(res.data);
      } catch (error) {
          console.error("Error fetching video stats:", error);
      }
  };

    fetchVideoStats();
  }, []);


  return (
    <div className="video-stats-graphs">

      {/* Bar Chart */}
      <div className="chart-container">
        <h3 className="head01">Users with videos vs Users without videos</h3>
        <div className="d-flex">
            <ResponsiveContainer width="50%" height={300}>
              <h2 className="head01 text-center">Bar Chart</h2>
              <BarChart data={videoStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height={300}>
            <h2 className="head01 text-center">Pie Chart</h2>
              <PieChart>
                <Pie data={videoStats} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {videoStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default statsGraph;
