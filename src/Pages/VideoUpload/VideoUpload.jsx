// rafce
import  { useContext,useState } from 'react'
import './VideoUpload.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lightning from '../../bitsEffects/lightning/Lightning';
import { addVideoContext } from '../../contexts/ContextShare'
import { addVideoAPI } from '../../../services/allAPI';

const VideoUpload = () => {
    const [inputField, setInputField] = useState({
        "title": "",
        "description": "",
        "gameName": "",
        "videoLink": "",
        "thumbnail": "",
    })
    // console.log(inputField);

    const {addVideoResponse,setAddVideoResponse} = useContext(addVideoContext)
    // console.log(addVideoResponse);
    
    const navigate = useNavigate()

    const [loader, setLoader] = useState(false)

    const uploadDetails = async (e, type) => {
        setLoader(true)
        // console.log('uploading');
        const files = e.target.files
        // console.log(files);
        const data = new FormData();
        data.append('file', files[0])
        // clipit
        data.append('upload_preset', 'clipit')
        try {
            // cloudName = da8frst4a
            const response = await axios.post(`https://api.cloudinary.com/v1_1/da8frst4a/${type}/upload`, data)
            // console.log(response);
            const url = response.data.url
            setLoader((false))
            let val = type === "image" ? "thumbnail" : "videoLink"
            setInputField({
                ...inputField, [val]: url
            })
        } catch (err) {
            setLoader(false)
            // console.log(err);
        }
    }
    // console.log(inputField);

    const handleUpload = async () => {
        setLoader(true);
        try {
            const response = await addVideoAPI(inputField);
            // console.log(response.data);
            setAddVideoResponse(response.data); 
            toast.success('Video uploaded successfully!');
            setTimeout(() => navigate('/allvideos'), 3000);
        } catch (err) {
            console.error(err);
            toast.error('Failed to upload video. Try again.'); 
        } finally {
            setLoader(false); 
        }
    };
    
    return (
        <div className='videoUpload'>
        <Lightning hue={220} xOffset={0} speed={.7} intensity={1} size={1} />
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <AddCircleIcon />
                    Upload Content
                </div>

                <div className="uploadForm">
                    <input type="text" value={inputField.title} onChange={e => setInputField({ ...inputField, title: e.target.value })} placeholder='*Title of video' className='uploadFormInputs' />
                    <input type="text" value={inputField.description} onChange={e => setInputField({ ...inputField, description: e.target.value })} placeholder='*Description' className='uploadFormInputs' />
                    <input type="text" value={inputField.gameName} onChange={e => setInputField({ ...inputField, gameName: e.target.value })} placeholder='*Name of Game' className='uploadFormInputs' />

                    <div style={{ backgroundImage: 'linear-gradient(to right, rgb(0, 0, 0), #00d3f8,rgb(0, 0, 0))' }}>Add Thumbnail:
                            <input className='add' onChange={(e) => uploadDetails(e, "image")} type="file" accept='image/' />
                    </div>

                    <div style={{ backgroundImage: 'linear-gradient(to right, rgb(0, 0, 0), #00d3f8,rgb(0, 0, 0))' }}>Add Video:
                            <input className='add' onChange={(e) => uploadDetails(e, "video")}  type="file" accept='video/mp4, video/webm' />
                    </div>

                    {
                        loader && <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    }

                    <div className="uploadBtns">
                        <Link to={'/home'} className="uploadButton_back">Go Back</Link>
                        <Link className="uploadButton_done" onClick={handleUpload}>Upload</Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default VideoUpload