import React, { useState, useEffect, useContext } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import Stack from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { editContext } from '../contexts/ContextShare';
import { editProfileAPI } from '../../services/allAPI';


const Edit = ({ show, handleClose , user  }) => {
  const [uploadedImageUrl, setuploadedImageUrl] = useState()
  const [userDetails, setUserDetails] = useState({
    id:user?._id, channelName:user?.channelName, userName:user?.userName, password:user?.password, about:user?.about, profilePic:user?.profilePic
  })
  console.log(userDetails);
  const { editUserResponse, setEditUserResponse} = useContext(editContext)

  useEffect(() => {
    console.log("Updating user with ID:", userDetails.id);  // Debugging
    
    if (user) {
        setUserDetails({
            id: user?._id || "",
            channelName: user?.channelName || "",
            userName: user?.userName || "",
            password: "",
            about: user?.about || "",
            profilePic: user?.profilePic || ""
        });

        if (user.profilePic) {
          setuploadedImageUrl(user.profilePic);
      }
    }
}, [user]);



const handleUpdate = async () => {

    const { id, channelName, userName, password, about, profilePic } = userDetails;

    if (!channelName || !userName || !password || !about) {
        return alert("All fields are required!");
    }
    const reqBody = { channelName, userName, password, about, profilePic };
    const token = sessionStorage.getItem("token");

    if (!token) {
        return alert("No authentication token found!");
    }
    try {
        const result = await editProfileAPI(id,reqBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Update Success:", result.data);
        alert("Profile Updated Successfully");
        setEditUserResponse(result.data)
        handleClose();
    } catch (err) {
        console.error("Update Failed:", err);
        alert("Update failed! Please try again.");
    }
};


    

  const uploadImage = async (e) => {
      const files = e.target.files
      console.log(files);
      const data = new FormData();
      data.append('file', files[0])
  
      data.append('upload_preset', 'clipit')
      try {
        // cloudName = da8frst4a
        const response = await axios.post("https://api.cloudinary.com/v1_1/da8frst4a/image/upload", data)
        console.log(response);
        const imageUrl = response.data.url
        setuploadedImageUrl(imageUrl)
        setUserDetails({
          ...userDetails, "profilePic": imageUrl
        })
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-info" closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInputChannelName" label="Channel Name" className="mb-3">
            <Form.Control value={userDetails.channelName} type="text" onChange={e=>setUserDetails({...userDetails,channelName:e.target.value})} placeholder="Channel name" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInputUName" label="Username" className="mb-3">
            <Form.Control value={userDetails.userName}  type="text" onChange={e=>setUserDetails({...userDetails,userName:e.target.value})} placeholder="Username" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInputPassword" label="New Password" className="mb-3">
            <Form.Control value={userDetails.password}  type="text" onChange={e=>setUserDetails({...userDetails,password:e.target.value})} placeholder="Enter new password" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInputAbout" label="About" className="mb-3">
            <Form.Control value={userDetails.about}  type="text" onChange={e=>setUserDetails({...userDetails,about:e.target.value})} placeholder="About" />
          </FloatingLabel>
          <div className='d-flex ' style={{ color: 'black', }}>
            Profile:
            <label>
            <input style={{ display: 'none' }} type="file" onChange={(e) => uploadImage(e)} />
                            <img style={{ cursor: 'pointer' }} className='img-fluid w-25 ms-5' src={uploadedImageUrl} alt="" />
            </label>
          </div>
  
  
        </Modal.Body>
        <Modal.Footer className="bg-info">
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdate} variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Edit;
