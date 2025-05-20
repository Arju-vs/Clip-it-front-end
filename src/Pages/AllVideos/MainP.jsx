// rafce
import React from 'react'
import SideNavbar from '../../Components/SideNavbar/SideNavbar'
import VideoPage from '../../Components/MainPage/VideoPage'

const MainP = ({sideNavbar}) => {
  return (
    <div>
        <SideNavbar sideNavbar={sideNavbar}/>
        <VideoPage sideNavbar={sideNavbar}/>
    </div>
  )
}

export default MainP