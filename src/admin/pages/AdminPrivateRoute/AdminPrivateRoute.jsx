import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const adminToken = sessionStorage.getItem("adminToken");
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!adminToken || !user?.isAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminPrivateRoute;
