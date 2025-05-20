// rafce
import React from 'react'
import SideNavbar from '../Components/SideNavbar/SideNavbar'
import HomePage from '../Components/HomePage/HomePage'
import './Home.css'
const Home = ({sideNavbar}) => {
  return (
    <>
    <div className="home">
      <SideNavbar sideNavbar={sideNavbar} />
      <HomePage sideNavbar={sideNavbar} />
    </div>
    </>
  )
}

export default Home