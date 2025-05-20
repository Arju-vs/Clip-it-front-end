import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageUsers.css";
import { FaTrash } from "react-icons/fa";
import { adminDeleteUser, adminGetUsersAPI } from "../../../../services/allAPI";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const adminToken = sessionStorage.getItem("adminToken");

    useEffect(() => {
        fetchUsers();
    }, [adminToken]);

    const fetchUsers = async () => {
        try {
            const res = await adminGetUsersAPI()
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error.response?.data?.message || error.message);
        }
    };


    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowPopup(true);
    };


const confirmDelete = async () => {
    try {
        if (!selectedUser?.id) {
            console.error("No user ID found");
            return;
        }

        await adminDeleteUser(selectedUser.id);

        setUsers(users.filter((user) => user._id !== selectedUser.id));
        fetchUsers();
        setShowPopup(false);
        setSelectedUser(null);

    } catch (error) {
        console.error("Error deleting user:", error.response?.data?.message || error.message);
    }
};


    return (
        <div>
            <h2 className="adminHead">User Details</h2>
            <div className="table-sectionUsers">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Channel ID</th>
                            <th>Username</th>
                            <th>Channel Name</th>
                            <th>Total Videos</th>
                            <th>Total Followers</th>
                            <th>Total Followings</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index) => (
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.channelName}</td>
                                <td>{user.totalVideos}</td>
                                <td>{user.followersCount}</td>
                                <td>{user.followingsCount}</td>
                                <td>
                                    <FaTrash className="delete-icon" onClick={() => handleDeleteClick(user)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Are you sure you want to delete <strong>{selectedUser?.userName}</strong>?</p>
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

export default AdminUsers;
