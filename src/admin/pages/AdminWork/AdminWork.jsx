
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import './AdminWork.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { adminAddWorkAPI, adminGetWorksAPI, adminRemoveWorks } from '../../../../services/allAPI'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Edit from '../../components/Edit'


const AdminWork = () => {

    const [selectedWork,setSelectedWork] = useState(null)
    const [allworks,setAllworks] = useState({})
    const [uploadedImage,setUploadedImage] = useState(null)
    const [form,setForm] = useState({
        title:"",
        content:"",
        image: uploadedImage
    })
    console.log(form);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(()=>{
        handleView()
    },[])


    const uploadImage = async (e)=>{
        const files = e.target.files
        console.log(files);
        const formData = new FormData()
        formData.append('file',files[0])
        formData.append('upload_preset','clipit')
        try{
            const response = await axios.post("https://api.cloudinary.com/v1_1/da8frst4a/image/upload",formData)
            console.log(response);
            const imageUrl = response.data.url
            setUploadedImage(imageUrl)
            setForm({
                ...form,image:imageUrl
            })       
        }catch (err) {
      console.log(err);
    }
    }

    const handleForm = async (e,req,res)=>{
        e.preventDefault()
        try{
            const result = await adminAddWorkAPI(form)
            console.log(result);
            alert("success")
            handleView()

        }catch(err){
            console.log(err);
        }
    }

    const handleView = async ()=>{
        try{
            const result = await adminGetWorksAPI()
            console.log(result.data);
            setAllworks(result.data)

        }catch(err){
            console.log(err);
        }
    }
    
    const handleDelete = async (id)=>{
      try{
        const result = await adminRemoveWorks(id)
        if(result.status==200){
          handleView()
        }else{
          alert("Couldnt delete!!")
        }
     }catch(err){
      console.log(err);
     }
    }

    const handleEdit = async (item)=>{
      setSelectedWork(item)
      handleShow()
    }

  return (
    <>
    <div className='AdminWorks'>
    <Form onSubmit={handleForm}>
        <h2>Add Work</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter Title"
        className="mb-3"
      >
        <Form.Control type="title" placeholder="enter title" value={form.value} onChange={(e)=>{setForm({...form,title:e.target.value})}} />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea2"  label="Enter Content">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
          onChange={(e)=>{setForm({...form,content:e.target.value})}}
          value={form.content}
        />
      </FloatingLabel>

      <Form.Group controlId="formFileSm" className="mb-3 my-3">
        <Form.Label>Upload</Form.Label>
        <Form.Control type="file" size="sm" onChange={uploadImage} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>  

    <div className="displayWorks">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                {
                    allworks?.length >0 ?
                    allworks?.map((item,index)=>(
                        <tr key={item._id}>
                          <td>{index+1}</td>
                            <td>{item.title}</td>
                            <td>{item.content}</td>
                            <td>
                                <img src={item.image} alt="work" width="100" height="60" />
                            </td>
                            <td>
                              <button onClick={()=>handleEdit(item)} className='btn btn-light'><EditIcon className='text-info' /></button>
                              <button onClick={()=>handleDelete(item._id)} className='btn btn-light'><DeleteIcon className='text-danger' /></button>
                            </td>
                            </tr>
                        )):
                    <tr>
                      <td colSpan="5" className="text-danger text-center">No Works</td>
                    </tr>
                }
          </tbody>
        </table>
        {
          selectedWork &&
          <Edit show={show} handleClose={handleClose} selectedWork={selectedWork}/>
        }
    </div>
    </>
  )
}

export default AdminWork