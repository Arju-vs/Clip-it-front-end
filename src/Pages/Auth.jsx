// rafce
import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { Form, FloatingLabel } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Stack from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import LoginModel from '../Components/loginModel'
import './auth.css'
import { tokenContext } from '../contexts/TokenAuth'
import { loginAPI, registerAPI } from '../../services/allAPI'

const Auth = ({ insideRegister }) => {
  const {authorisedUser, setAuthorisedUser} = useContext(tokenContext)
  const [uploadedImageUrl, setuploadedImageUrl] = useState("https://cdn-icons-png.flaticon.com/512/12951/12951923.png")
  const [userInput, setUserInput] = useState({
    "channelName": "",
    "userName": "",
    "password": "",
    "about": "",
    "profilePic": uploadedImageUrl
  })
  console.log(userInput);

  const [progressBar, setProgressBar] = useState(false)
  const navigate = useNavigate()

  const uploadImage = async (e) => {
    const files = e.target.files
    console.log(files);
    const data = new FormData();
    data.append('file', files[0])
    data.append('upload_preset', 'clipit')
    try {
      setProgressBar(true)
      // cloudinaryName = da8frst4a
      const response = await axios.post("https://api.cloudinary.com/v1_1/da8frst4a/image/upload", data)
      setProgressBar(false)
      console.log(response);
      const imageUrl = response.data.url
      setuploadedImageUrl(imageUrl)
      setUserInput({
        ...userInput, "profilePic": imageUrl
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setProgressBar(true)
      const response = await registerAPI(userInput);
      console.log(response);
      toast.success("Successfully registered!");
      setProgressBar(false)
      navigate('/login')
      setUserInput({
       channelName:"",userName:"",password:"",about:"",profilePic: uploadedImageUrl
      })
    } catch (err) {
      // console.error(err);
      setProgressBar(false)
      if(err.response && err.response.status === 404){
        toast.error(err.response.data.error);
      }else{
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        setProgressBar(true);
        const response = await loginAPI(userInput);
        console.log(response);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.user._id);
        sessionStorage.setItem("userProfilePic", response.data.user.profilePic);
        
        setAuthorisedUser(true);
        navigate('/home');
    } catch (err) {
        toast.error(err.error || "Invalid Username / Password");
        console.error(err);
    } finally {
        setProgressBar(false);
    }
};


  return (
    <>
      <div>
        <div style={{ minHeight: '100vh', width: '100%' }} className="auth d-flex justify-content-center align-items-center">
          <LoginModel />
          <div style={{ marginLeft: '700px' }} className="container w-50 ">
            <div style={{ backgroundColor:'rgba(255, 255, 255, 0.03)', borderColor: 'transparent' }} className="card d-flex align-items-center p-2">
              <div className="col-lg-8">
                <h1 className="my-2"><img src={logo} className='img-fluid' style={{ marginLeft: '185px' }} width={'100px'} alt="" /></h1>
                <h3 className='text-center text-white'>SIGN {insideRegister ? 'UP' : 'IN'} : </h3>
                <Form>
                  {
                    insideRegister &&
                    <FloatingLabel controlId="floatingInputChannel" label="Channel Name" className="mb-3">
                      <Form.Control value={userInput.channelName} onChange={e => setUserInput({ ...userInput, channelName: e.target.value })} type="text" placeholder="Channel Name" autoComplete='off' />
                    </FloatingLabel>
                  }
                  <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                    <Form.Control value={userInput.userName} onChange={e => setUserInput({ ...userInput, userName: e.target.value })} type="text" placeholder="Username" autoComplete='off' />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control value={userInput.password} onChange={e => setUserInput({ ...userInput, password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>
                  {
                    insideRegister ?
                      <div>
                        <FloatingLabel controlId="floatingInputAbout" label="About" className="mb-3">
                          <Form.Control value={userInput.about} onChange={e => setUserInput({ ...userInput, about: e.target.value })} type="text" placeholder="desc" autoComplete='off' />
                        </FloatingLabel>
                        <div className='d-flex ' style={{ color: 'black', }}>
                          Profile:
                          <label>
                            <input style={{ display: 'none' }} type="file" onChange={(e) => uploadImage(e)} />
                            <img style={{ cursor: 'pointer' }} className='img-fluid w-25 ms-5' src={uploadedImageUrl} alt="" />
                          </label>
                        </div>
  
                        <button onClick={handleSignUp} className="button-55 mt-3 mb-2">REGISTER</button>
                        <Link to={'/'} className="button-55 mt-2 mb-2 ms-5 " role="button">CANCEL</Link>
                        <p>Already a user? Please <Link className='text-info fs-4' to={'/login'}>Login</Link></p>
                      </div>
                      :
                      <div>
                        <button onClick={handleLogin} className="button-55 mt-2" role="button">LOGIN</button>
                        <button className="button-55 mt-2 ms-5" role="button">CANCEL</button>
                        <p className='loginText'>Already a user? Please <Link className='text-info fs-4' to={'/register'}>Register</Link></p>
                      </div>
                  }
                </Form>
              </div>
              { 
               progressBar && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="success" />
              </Stack>
              }
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Auth