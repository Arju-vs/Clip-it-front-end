import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("user");
    navigate("/admin");
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1>ClipIt Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <div className="admin-main">
        {/* Sidebar */}
        <nav className="admin-sidebar">
          <ul>
            <li><Link to="/admin-page/dashboard">Dashboard</Link></li>
            <li><Link to="/admin-page/users">Manage Users</Link></li>
            <li><Link to="/admin-page/videos">Manage Videos</Link></li>
            <li><Link to="/admin-page/comments">Manage Comments</Link></li>
            <li><Link to="/admin-page/contacts">Manage Contacts</Link></li>
            <li><Link to="/admin-page/works">Manage Works</Link></li>
          </ul>
        </nav>

        {/* Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
