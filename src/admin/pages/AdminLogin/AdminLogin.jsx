import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Import CSS
import { adminLoginAPI } from "../../../../services/allAPI";

const AdminLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
        const response = await adminLoginAPI(
            { userName, password },
            { "Content-Type": "application/json" }
        );
        const data = response.data;

        sessionStorage.setItem("adminToken", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        navigate("/admin-page/dashboard");
    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong. Try again.");
    }
};


  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2 className="adminHead">Admin LOGIN</h2>
        <p className="adminP">Tresspassing stictly prohibited</p>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Admin Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
