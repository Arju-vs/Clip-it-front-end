import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap'
import { adminEditWorks } from '../../../services/allAPI'

const Edit = ({ show, handleClose, selectedWork }) => {

  const [update, setUpdate] = useState({
    title: '',
    content: '',
    image: ''
  })

  useEffect(() => {
    if (selectedWork) {
      setUpdate({
        title: selectedWork.title,
        content: selectedWork.content,
        image: selectedWork.image
      })
    }
  }, [selectedWork])

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'clipit')

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/da8frst4a/image/upload", data)
      const imageUrl = response.data.url
      setUpdate({
        ...update,
        image: imageUrl
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async () => {
    try {
      const result = await adminEditWorks(selectedWork._id, update)
      if (result.status === 200) {
        alert("Work updated successfully!")
        handleClose()
        window.location.reload()  // Optional: You can use state update instead for better UX
      } else {
        alert("Failed to update!")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Work</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="Enter Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={update.title}
            onChange={(e) => setUpdate({ ...update, title: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingTextarea2" label="Enter Content">
          <Form.Control
            as="textarea"
            placeholder="Enter content"
            style={{ height: '100px' }}
            value={update.content}
            onChange={(e) => setUpdate({ ...update, content: e.target.value })}
          />
        </FloatingLabel>

        <Form.Group controlId="formFileSm" className="mb-3 my-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" size="sm" onChange={uploadImage} />
          {update.image && <img src={update.image} alt="preview" width="100" height="60" className="mt-2" />}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Edit
