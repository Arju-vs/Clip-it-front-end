// rafce

import './SideNavbar.css'
import CottageIcon from '@mui/icons-material/Cottage';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CollectionsIcon from '@mui/icons-material/Collections';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CategoryIcon from '@mui/icons-material/Category';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import { Link } from 'react-router-dom';

const SideNavbar = ({sideNavbar}) => {

    const id = sessionStorage.getItem("userId")

  return (
    <div className={sideNavbar?'home-sideNavbar':'home-sideNavbarHide'}>
        <div className="home-sideNavbarTop">
            <div className="home-sideNavbarTopOption">
                <CottageIcon />
                <Link style={{textDecoration:'none'}} to={`/home`}>
                <div className="home-sideNavbatTopOptionTitle">Home</div>
                </Link>
            </div>

            <div className="home-sideNavbarTopOption">
                <FileUploadIcon />
                <Link style={{textDecoration:'none'}} to={`/${id}/upload`}>
                <div className="home-sideNavbatTopOptionTitle">Upload</div>
                </Link>
            </div>

            <div className="home-sideNavbarTopOption">
                <CollectionsIcon />
                <Link style={{textDecoration:'none'}} to={`/allvideos`}>
                <div className="home-sideNavbatTopOptionTitle">All Videos</div>
                </Link>
            </div>
        </div>
        <div className="home-sideNavbarBottom">
            <div className="home-sideNavbarBtmOption">
            <TrendingUpIcon />
                <Link style={{textDecoration:'none'}} to={`/trendings`}>
                <div className="home-sideNavbatTopOptionTitle">Trendings</div>
                </Link>
            </div>

            <div className="home-sideNavbarBtmOption">
            <CategoryIcon />
                <Link style={{textDecoration:'none'}} to={`/categoryPage`}>
                <div className="home-sideNavbatTopOptionTitle">Categories</div>
                </Link>
            </div>

            <div className="home-sideNavbarBtmOption">
            <SmartToyIcon />
                <Link style={{textDecoration:'none'}} to={`/chatbot`}>
                <div className="home-sideNavbatTopOptionTitle">Clip Bot</div>
                </Link>
            </div>

            <div className="home-sideNavbarBtmOption">
            <AccountBoxIcon />
                <Link style={{textDecoration:'none'}} to={`/myProfile/${id}`}>
                <div className="home-sideNavbatTopOptionTitle">My Profile</div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SideNavbar