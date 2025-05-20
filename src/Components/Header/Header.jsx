// rafce
import React, { useState, useEffect } from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Header = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userPic, setuserPic] = useState("https://cdn-icons-png.flaticon.com/128/11029/11029675.png")
  const [navbarModal, setNavbarModal] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const navigate = useNavigate()

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar)
  }

  const handleProfile = () => {
    const userId = sessionStorage.getItem("userId")
    navigate(`/myProfile/${userId}`)
    setNavbarModal(false)
  }

  useEffect(() => {
    const userProfilePic = sessionStorage.getItem("userProfilePic")
    setIsLogin(sessionStorage.getItem("userId") !== null ? true : false)
    if (userProfilePic !== null) {
      setuserPic(userProfilePic)
    }
  })


  return (
    <>
      <div className="navbar ">
        <div className="navbar-left">
          <div className="navbarHamburger" onClick={sideNavbarFunc}>
            <MenuIcon className='fs-1' />
          </div>
          <div style={{ cursor: 'pointer' }} className="fs-3 logo">
            <SportsEsportsOutlinedIcon className='ms-2 bounce-icon' />
            <Link style={{fontSize:'35px' }} className='logotext' to={'/home'}>ClipIT!</Link>
          </div>
        </div>
        <div className="navbar-right">
          <img onClick={handleProfile} title='My Profile' src={userPic} alt="logo" className="navbar-right-logo img-fluid" />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Header