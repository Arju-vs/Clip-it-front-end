import { useState, useEffect, useContext } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import './App.css'
import './bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Header from './Components/Header/Header'
import Video from './Pages/Video/Video'
import MyProfile from './Pages/Profiles/MyProfile'
import VideoUpload from './Pages/VideoUpload/VideoUpload'
import MainP from './Pages/AllVideos/MainP'
import Pnf from './Pages/Pnf'
import Loading from './Components/Loading'
import UserProfile from './Pages/Profiles/UserProfile';
import Trendings from './Pages/Trendings/Trendings';
import Category from './Pages/Category/Category'
import AdminLogin from './admin/pages/AdminLogin/AdminLogin';
import AdminPrivateRoute from './admin/pages/AdminPrivateRoute/AdminPrivateRoute'
import AdminLayout from './admin/pages/AdminLayout/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import AdminManageUsers from './admin/pages/AdminManageUsers/ManageUsers';
import AdminVideos from './admin/pages/AdminVideos/AdminVideos'
import AdminComments from './admin/pages/AdminComments/AdminComments';
import AdminContacts from './admin/pages/AdminContacts/AdminContacts';
import AdminWork from './admin/pages/AdminWork/AdminWork';
import { tokenContext } from './contexts/TokenAuth';
import GameChatbot from './Pages/ChatBot/Chatbot';
import Works from './Pages/Works/Works';

function App() {
  const {authorisedUser, setAuthorisedUser} = useContext(tokenContext)
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Define paths where Header should not be shown
  const noHeaderRoutes = ['/', '/login', '/register', '/admin', '/chatbot'];

  // Check if current pathname matches noHeaderRoutes or follows the /:id/upload pattern
  const isNoHeaderRoute = noHeaderRoutes.includes(location.pathname) || location.pathname.startsWith('/admin') || /^\/[^/]+\/upload$/.test(location.pathname) || location.pathname.startsWith('/works');

  const [sideNavbar, setSideNavbar] = useState(true);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  const user = JSON.parse(sessionStorage.getItem("user"))

  return (
    <>
      {!isNoHeaderRoute && <Header setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />}
      <Routes>
        {/* admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-page" element={<AdminPrivateRoute> <AdminLayout /></AdminPrivateRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminManageUsers />} />
        <Route path="videos" element={<AdminVideos />} />
        <Route path="comments" element={<AdminComments />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="works" element={ <AdminWork /> }/>
        </Route>

        {/* client */}
        <Route path='/' element={loading ? <Loading /> : <Landing />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/works/:id' element={ <Works/> } />
        { authorisedUser &&
          <>
            <Route path='/home' element={<Home sideNavbar={sideNavbar} />} />
            <Route path='/allvideos' element={<MainP sideNavbar={sideNavbar} />} />
            <Route path='/trendings' element={<Trendings sideNavbar={sideNavbar}/>}/>
            <Route path='/categoryPage' element={<Category sideNavbar={sideNavbar}/>}/>
            <Route path='/watch/:id' element={<Video sideNavbar={sideNavbar} />} />
            <Route path='/myProfile/:id' element={<MyProfile sideNavbar={sideNavbar} />} />
            <Route path='/user/:id' element={<UserProfile sideNavbar={sideNavbar} />} />
            <Route path='/:id/upload' element={<VideoUpload />} />
            <Route path='/chatbot' element={<GameChatbot />}></Route>
          </>
        }
        <Route path='/*' element={<Pnf />} />
      </Routes>
    </>
  );
}

export default App;
